import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
const RighButtonHeader = ({ route, marginRight }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight }}>
      <FontAwesomeIcon
        icon={faAngleDown}
        size={30}
        color={COLORS.dark}
        style={{
          marginRight: 10,
          borderRadius: 50,
          borderColor: COLORS.dark,
          padding: 5,
        }}
      />
      <TouchableOpacity
        style={styles.logo}
        onPress={() => {
          route?.name !== "Profile" && navigation.navigate("Profile");
          route?.name === "Profile" && navigation.navigate("Home");
          !route && navigation.navigate("Profile");
        }}
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
});

export default RighButtonHeader;
