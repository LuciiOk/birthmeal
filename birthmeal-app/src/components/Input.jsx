import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Input = ({ placeholder, keyboardType, isPassword = false }) => {
  const [value, setValue] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  const onChange = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && isSecure}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={COLORS.grayDark}
      />
      {isPassword && (
        <TouchableOpacity style={styles.icon} onPress={() => setIsSecure(!isSecure)}>
          <FontAwesome
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
    paddingHorizontal: 10,
    paddingRight: 0,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: COLORS.dark,
    width: "100%",
  },
  input: {
    width: "90%",
    height: 50,
    fontSize: 16,
    color: COLORS.dark,
    fontFamily: "Lato-Bold",
  },
  icon: {
    width: "10%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default Input;
