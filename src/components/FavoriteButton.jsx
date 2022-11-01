import React, { useRef, useEffect, useContext, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

import useFavorite from "../hooks/useFavorite";
import { AuthContext } from "../contexts/AuthContext";
import LoginMessage from "./LoginMessage";

const FavoriteButton = ({ id }) => {
  const animation = useRef(null);
  const { isFavorite, onFavorite } = useFavorite(id);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (animation.current) {
      if (isFavorite) {
        animation.current.play(0, 30);
      } else {
        animation.current.play(0, 0);
      }
    }
  }, [isFavorite]);

  const handleFavorite = async () => {
    console.log(await isLogged())
    if (!(await isLogged())) {
      setShowLoginMessage(true);
      return;
    }
    onFavorite();
  };

  return (
    <TouchableWithoutFeedback onPress={handleFavorite}>
      <View style={styles.container}>
        <LottieView
          ref={animation}
          source={require("../../assets/loties/favorite.json")}
          loop={false}
          style={styles.animation}
        />
        <LoginMessage
          visible={showLoginMessage}
          onClose={() => setShowLoginMessage(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 70,
    height: 70,
  },
  icon: {
    position: "absolute",
  },
});

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FavoriteButton;
