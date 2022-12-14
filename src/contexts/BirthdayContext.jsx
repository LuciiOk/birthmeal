import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AxiosInstance from "../utils/AxiosInstance";
import { AuthContext } from "./AuthContext";

export const BirthdayContext = createContext();

const BirthdayProvider = ({ children }) => {
  const { token, isLogged } = React.useContext(AuthContext);
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBirthdays();
  }, [token]);

  const fetchBirthdays = async () => {
    try {
      if (!(await isLogged())) {
        setLoading(false);
        setBirthdays([]);
        return;
      }
      const { data } = await AxiosInstance.get("birthdays/profile");
      setBirthdays(data || []);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addBirthday = async (birthday) => {
    try {
      setLoading(true);
      birthday.birthdate = new Date(birthday.birthdate).toISOString();
      const { data } = await AxiosInstance.post("birthdays", birthday);
      setBirthdays([...birthdays, data]);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const updateBirthday = async (birthday) => {
    try {
      setLoading(true);
      const index = birthdays.findIndex((b) => b.id === birthday.id);
      setBirthdays([
        ...birthdays.slice(0, index),
        birthday,
        ...birthdays.slice(index + 1),
      ]);

      await AxiosInstance.put(`birthdays/${birthday.id}`, birthday);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteBirthday = async (id) => {
    try {
      setLoading(true);
      await AxiosInstance.delete(`birthdays/${id}`);
      setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BirthdayContext.Provider
      value={{
        birthdays,
        loading,
        fetchBirthdays,
        addBirthday,
        deleteBirthday,
        updateBirthday,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

BirthdayProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BirthdayProvider;
