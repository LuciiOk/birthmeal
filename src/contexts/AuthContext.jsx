import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { methods, URL } from "../hooks/useFetchData";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios({
        method: methods.POST,
        url: `${URL}auth/login`,
        data: { email, password },
      });
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  };

  const isLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      if (user && token) {
        setUser(user);
        setToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
