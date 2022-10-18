import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Input = ({ placeholder, keyboardType, isPassword = false, value, onChangeText }) => {
  const [isSecure, setIsSecure] = useState(true);
  const icon = !isPassword ? "user" : "lock";

  const onChange = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={20} color={COLORS.dark} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && isSecure}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.grayDark}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.showPassword}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Icon
              name={isSecure ? "eye-slash" : "eye"}
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingRight: 0,
    marginTop: 10,
    borderWidth: 2,
    borderColor: COLORS.dark,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color: COLORS.dark,
  },
  showPassword: {
    position: "absolute",
    right: 10,
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Input;
