import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const SignUserDetails = ({ to, text, redirectText }) => {

  const navigation = useNavigation();

  const navigate = () => {
    navigation.navigate(to);
  };

  return (
    <View style={{ marginTop: 5 }}>
      <Text text={text} light styles={{ textAlign: "center" }} />
      <TouchableOpacity onPress={navigate}>
        <Text
          text={redirectText}
          bold
          styles={{ textAlign: "center", color: COLORS.dark }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

})

export default SignUserDetails;
