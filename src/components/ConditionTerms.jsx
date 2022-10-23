import React from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const ConditionTerms = ({ isSelected, setSelection }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isSelected}
        onValueChange={setSelection}
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
    marginBottom: 20,
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
