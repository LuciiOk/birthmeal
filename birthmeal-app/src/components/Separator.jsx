import React from "react";
import { View } from "react-native";
import { COLORS } from "../constants/colorSchema";

const Separator = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 1.5,
        borderRadius: 10,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        opacity: 0.65,
      }}
    />
  );
};

export default Separator;
