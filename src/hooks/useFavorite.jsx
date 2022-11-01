import React, { useContext } from "react";
import { ToastAndroid } from "react-native";
import AxiosInstance from "../utils/AxiosInstance";
import { AuthContext } from "../contexts/AuthContext";

const useFavorite = (company) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { isLogged } = useContext(AuthContext);

  const handleFavorite = async () => {
    try {
      if (await isLogged()) {
        const { data } = await AxiosInstance.get(`user/favorite/${company}`);
        setIsFavorite(data);
      }
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
