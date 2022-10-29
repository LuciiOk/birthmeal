import React from "react";
import { ToastAndroid } from "react-native";
import AxiosInstance from "../utils/AxiosInstance";

const useFavorite = (company) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = async () => {
    try {
      const { data } = await AxiosInstance.get(`user/favorite/${company}`);
      setIsFavorite(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleFavorite();
  }, []);

  const onFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      await AxiosInstance.post("user/favorite", {
        company,
      });
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error al agregar a favoritos", ToastAndroid.SHORT);
    }
  };

  return { isFavorite, onFavorite };
};

export default useFavorite;
