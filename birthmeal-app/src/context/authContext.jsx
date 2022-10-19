import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (user, token) => {
    setUser(user);
    setToken(token);
    try {
      await AsyncStorage.setItem("user", user);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
