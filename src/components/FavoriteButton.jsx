import React, { useRef, useEffect, useContext, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

import LoginMessage from "./LoginMessage";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import ConfirmModal from "../containers/ConfirmModal";

const FavoriteButton = ({ company, noAnimate }) => {
  const animation = useRef(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { isFavorite, onFavorite, favorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (!noAnimate) {
      if (animation.current) {
        if (isFavorite(company)) {
          animation.current.play(0, 30);
        } else {
          animation.current.play(0, 0);
        }
      }
    } else {
      animation.current.play(30, 30);
    }
  }, [company, favorites]);

  const handleFavorite = async () => {
    try {
      if (!(await onFavorite(company))) setShowLoginMessage(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={noAnimate ? () => setConfirm(true) : handleFavorite}
    >
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
        {noAnimate && (
          <ConfirmModal
            show={confirm}
            setShow={setConfirm}
            onAccept={handleFavorite}
            message="¿Deseas quitar esta empresa de tus favoritos?"
          />
        )}
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
  company: PropTypes.object.isRequired,
};

export default FavoriteButton;
