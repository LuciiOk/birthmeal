import React from "react";
import { StyleSheet, Image, Dimensions, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Text from "./Text";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

const Header = ({ title }) => {
  return (
    <SafeAreaView style={styles.header}>
      {/* <StatusBar style="dark" /> */}
      <Image
        style={styles.logo}
        source={require("./../../assets/images/Burger-logo.png")}
      />
      <Text text={title} title bold />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width,
    height: 90,
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
