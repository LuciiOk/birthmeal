import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import { COLORS } from "../constants/colorSchema";

const Button = ({ buttonText, action, outlined, filled, buttonStyles }) => {
  const style = [
    styles.button,
    outlined && styles.outlined,
    filled && styles.filled,
    buttonStyles,
  ];

  return (
    <TouchableOpacity style={style} onPress={action}>
      <Text
        text={buttonText}
        bold
        title
        styles={{
          color: outlined ? COLORS.dark : COLORS.white,
        }}
      />
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
});

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  outlined: PropTypes.bool,
  filled: PropTypes.bool,
  buttonStyles: PropTypes.object,
};

export default Button;
