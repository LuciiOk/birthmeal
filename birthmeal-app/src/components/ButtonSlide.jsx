import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const ButtonSlide = ({ text, action }) => {
  const styleButton = [styles.button, text === "SKIP" && styles.buttonSkip];
  const styleText = [styles.buttonText, text === "SKIP" && styles.textSkip];

  return (
    <TouchableOpacity style={styleButton} onPress={action}>
      <Text style={styleText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: "Lato-Bold",
    fontWeight: "1000",
  },
  buttonSkip: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
  },
  textSkip: {
    color: "white",
  },
});

// add prop types
ButtonSlide.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default ButtonSlide;
