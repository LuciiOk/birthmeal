import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

import useFavorite from "../hooks/useFavorite";

const FavoriteButton = ({ id }) => {
  const animation = useRef(null);
  const { isFavorite, onFavorite } = useFavorite(id);

  useEffect(() => {
    if (animation.current) {
      if (isFavorite) {
        animation.current.play(0, 30);
      } else {
        animation.current.play(0, 0);
      }
    }
  }, [isFavorite]);

  return (
    <TouchableWithoutFeedback onPress={() => onFavorite()}>
      <View style={styles.container}>
        <LottieView
          ref={animation}
          source={require("../../assets/loties/favorite.json")}
          loop={false}
          style={styles.animation}
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
