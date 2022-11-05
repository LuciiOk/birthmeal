import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import Axios from "../utils/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await Axios.post(`auth/login`, {
        email,
        password,
      });
      const { user, access_token } = data;
      setUser(user);
      setToken(access_token);
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      ToastAndroid.show("Has iniciado sesión", ToastAndroid.SHORT);
      return true;
    } catch ({ response }) {
      setError(response);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      ToastAndroid.show("Sesión cerrada", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };

  const isLogged = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
    }
  };

  const register = async (newUser) => {
    try {
      setLoading(true);
      const response = await Axios.post(`/auth/register`, newUser);
      const { user, access_token } = response.data;
      setUser(user);
      setToken(access_token);
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      ToastAndroid.show("Usuario registrado", ToastAndroid.SHORT);
      return {
        success: true,
      };
    } catch ({ response }) {
      setError(response.data);
      return response.data;
    } finally {
      setLoading(false);
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
        loading,
        error,
        login,
        logout,
        isLogged,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
