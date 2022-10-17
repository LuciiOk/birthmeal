import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Text from "./Text";
import { COLORS } from "../constants/colorSchema";

const Button = ({ buttonText, action }) => {

  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <Text text={buttonText} bold opaque />
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
    borderWidth: 2.5,
    borderColor: COLORS.dark,
  },
});

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;
