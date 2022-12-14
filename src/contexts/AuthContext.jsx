import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import Axios from "../utils/AxiosInstance";
import { clearAllNotifications } from "../hooks/useNotification";

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
      const { user: userData, access_token } = data;
      setUser(userData);
      setToken(access_token);
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      ToastAndroid.show("Has iniciado sesión", ToastAndroid.SHORT);
      setLoading(false);
      setError(null);
      return true;
    } catch ({ response }) {
      if (Array.isArray(response.data.message)) {
        setError(response.data.message);
      } else {
        setError(response.data.message);
        if (response.status === 500) {
          ToastAndroid.show("Error del servidor", ToastAndroid.SHORT);
          return;
        }
        setError(response.data.message);
      }
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
      clearAllNotifications();
      ToastAndroid.show("Sesión cerrada", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const isLogged = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const tokenData = await AsyncStorage.getItem("token");
      if (userData && tokenData) {
        setUser(JSON.parse(userData));
        setToken(tokenData);
        return true;
      }
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      setUser(null);
      setToken(null);
      return false;
    } catch (error) {
      console.log(error.message);
      logout();
      return false;
    }
  };

  const register = async (newUser) => {
    try {
      setLoading(true);
      const response = await Axios.post(`/auth/register`, newUser);
      const { user: userData, access_token } = response.data;
      setUser(userData);
      setToken(access_token);
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      ToastAndroid.show("Usuario registrado", ToastAndroid.SHORT);
      return true;
    } catch ({ response }) {
      // if is array but not string
      if (Array.isArray(response.data.message)) {
        setError(response.data.message[0]);
      } else {
        setError(response.data.message);
      }
      return false;
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
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
