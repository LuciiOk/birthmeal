import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  View,
  StatusBar,
} from "react-native";
import Text from "./Text";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const { width, height } = Dimensions.get("window");

const Header = (props) => {
  console.log(props);
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar style="dark" backgroundColor={COLORS.white} />
      <Image
        style={styles.logo}
        source={require("./../../assets/images/Burger-logo.png")}
      />
      <Text text={props.title} bold styles={styles.title} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: COLORS.white,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  title: {
    fontSize: 35,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
