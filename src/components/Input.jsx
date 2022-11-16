import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

import { Controller } from "react-hook-form";
import Text from "./Text";

const Input = ({
  placeholder,
  keyboardType,
  isPassword = false,
  control,
  name,
  rules = null,
  error
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const icon = !isPassword ? "user" : "lock";

  return (
    <>
      <View style={{ paddingRight: isPassword ? 0 : 10, ...styles.container }}>
        <View
          style={{
            width: isPassword ? "86%" : "100%",

            ...styles.inputContainer,
          }}
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
      {error && <Text text={error.message} error />}
    </>
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
    borderRadius: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.dark,
    fontSize: 14,
    paddingVertical: 2,
    fontFamily: "Lato-Bold",
  },
  showPassword: {
    width: "14%",
    paddingHorizontal: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
};

export default Input;
