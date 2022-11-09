import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

import { Controller } from "react-hook-form";

const Input = ({
  placeholder,
  keyboardType,
  isPassword = false,
  control,
  name,
  rules,
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const icon = !isPassword ? "user" : "lock";

  return (
    <View style={styles.container}>
      <View
        style={
          {
            width: isPassword ? "90%" : "100%",
            ...styles.inputContainer,
          }
        }
      >
        <Icon name={icon} size={20} color={COLORS.dark} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={isPassword && isSecure}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholderTextColor={COLORS.grayDark}
              style={styles.input}
            />
          )}
          name={name}
          rules={rules}
        />
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.dark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.dark,
  },
  showPassword: {
    width: "10%",
    paddingHorizontal: 5,
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Input;
