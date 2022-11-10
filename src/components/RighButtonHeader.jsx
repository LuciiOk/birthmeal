import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
const RighButtonHeader = ({ marginRight }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight }}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <FontAwesomeIcon
          icon={faAngleDown}
          size={30}
          color={COLORS.dark}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={require("../../assets/images/Burger-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: COLORS.dark,
  },
  icon: {
    marginRight: 10,
    borderRadius: 50,
    borderColor: COLORS.dark,
    padding: 5,
  },
});

export default RighButtonHeader;
