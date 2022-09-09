import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const ButtonSlide = ({ text }) => {
  const styleButton = [styles.button, text === "SKIP" && styles.buttonSkip];

  const styleText = [styles.buttonText, text === "SKIP" && styles.textSkip];

  return (
    <TouchableOpacity style={styleButton}>
      <Text style={styleText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSkip: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    fontFamily: "Lato-Bold",
    fontSize: 16,
    color: "#000",
  },
  textSkip: {
    color: "white",
  },
});

// add prop types
ButtonSlide.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonSlide;
