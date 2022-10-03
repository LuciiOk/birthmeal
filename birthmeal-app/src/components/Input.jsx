import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";


const Input = ({ placeholder, keyboardType, isPassword = false }) => {
  const [value, setValue] = useState("");

  const onChange = (text) => {
    setValue(text);
  };

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={COLORS.grayDark}
      keyboardType={keyboardType}
      secureTextEntry={isPassword}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2.5,
    borderColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    fontFamily: "Lato-Bold",
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Input;
