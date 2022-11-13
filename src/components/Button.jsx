import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import { COLORS } from "../constants/colorSchema";
import LottieView from "lottie-react-native";

const Button = ({
  buttonText,
  action,
  outlined,
  filled,
  buttonStyles,
  disabled,
  margin,
  loading,
}) => {
  const style = [
    styles.button,
    outlined && styles.outlined,
    filled && styles.filled,
    buttonStyles,
  ];

  return (
    <TouchableOpacity
      style={style}
      onPress={action}
      disabled={disabled || loading}
    >
      {!loading && (
        <Text
          text={buttonText}
          bold
          subtitle
          styles={{
            color: outlined ? COLORS.dark : COLORS.white,
          }}
        />
      )}
      {loading && (
        <LottieView
          source={require("../../assets/loties/loader.json")}
          autoPlay
          loop
          style={styles.animation}
          colorFilters={[
            {
              keypath: "Dot4",
              color: COLORS.white,
            },
            {
              keypath: "Dot3",
              color: COLORS.white,
            },
            {
              keypath: "Dot2",
              color: COLORS.white,
            },
            {
              keypath: "Dot1",
              color: COLORS.white,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  outlined: {
    borderWidth: 2.5,
    borderColor: COLORS.dark,
    backgroundColor: "transparent",
  },
  filled: {
    backgroundColor: COLORS.dark,
  },
  animation: {
    width: 200,
  },
});

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  outlined: PropTypes.bool,
  filled: PropTypes.bool,
  buttonStyles: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
