import React from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const ConditionTerms = () => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={true}
        onValueChange={(newValue) => console.log(newValue)}
        style={styles.checkbox}
      />
      <Text
        text="Acepto los términos y condiciones"
        styles={styles.checkboxText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  checkboxText: {
    color: COLORS.dark,
    fontSize: 14,
    marginLeft: 10,
  },
  checkbox: {
    color: COLORS.dark,
  },
});

export default ConditionTerms;
