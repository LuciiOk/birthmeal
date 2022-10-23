import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const SignUserDetails = ({ to, text, redirectText, alignText = "center" }) => {
  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate(to);
  };

  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
      }}
    >
      {text && <Text text={text} light styles={{ textAlign: alignText }} />}
      <TouchableOpacity onPress={navigate}>
        <Text
          text={redirectText}
          bold
          styles={{ textAlign: alignText, color: COLORS.dark }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SignUserDetails;