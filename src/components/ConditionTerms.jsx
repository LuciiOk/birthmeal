import React from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const ConditionTerms = ({ control, name, rules = null }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Controller
        control={control}
        render={({ field }) => (
          <Checkbox
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
            color={COLORS.danger}
          />
        )}
        name={name}
        rules={rules}
        defaultValue={false}
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

ConditionTerms.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
};

export default ConditionTerms;
