import React, { createContext, useState, useEffect, useCallback } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { ToastAndroid } from "react-native";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogged, token } = React.useContext(AuthContext);

  const getFavorites = useCallback(async () => {
    try {
      if (await isLogged()) {
        const {
          data: { data },
        } = await AxiosInstance.get("user/favorite");
        setFavorites(data);
        setLoading(false);
      } else {
        setLoading(false);
        setFavorites([]);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error al obtener los favoritos", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }, []);

  const onFavorite = async (company) => {
    try {
      if (await isLogged()) {
        await AxiosInstance.post("user/favorite", {
          company: company.id,
        });
        if (isFavorite(company)) {
          setFavorites(
            favorites.filter((favorite) => favorite.id !== company.id)
          );
        } else {
          setFavorites([...favorites, company]);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error al agregar a favoritos", ToastAndroid.SHORT);
    }
  };

  const isFavorite = (companyId) => {
    if (favorites.length > 0) {
      return favorites.some((favorite) => favorite.id === companyId.id);
    } else {
      return false;
    }
  };

  useEffect(() => {
    getFavorites();
  }, [token]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        getFavorites,
        onFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
