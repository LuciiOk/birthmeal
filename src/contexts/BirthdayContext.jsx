import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AxiosInstance from "../utils/AxiosInstance";

export const BirthdayContext = createContext();

const BirthdayProvider = ({ children }) => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      const { data } = await AxiosInstance.get("birthdays/profile");
      setBirthdays(data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addBirthday = async (birthday) => {
    try {
      setLoading(true);
      const { data } = await AxiosInstance.post("birthdays", birthday);
      setBirthdays([...birthdays, data]);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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