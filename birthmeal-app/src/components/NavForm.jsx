import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const NavForm = () => {
  return (
    <View style={styles.navLogin}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.light} />
      <Image
        source={require("../../assets/images/Burger-logo.png")}
        style={styles.logo}
      />
      <Text text="Birthmeal" bold opaque styles={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  navLogin: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: COLORS.light,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    
  },
  title: {
    color: COLORS.dark,
    fontSize: 20,
  },
});

export default NavForm;
