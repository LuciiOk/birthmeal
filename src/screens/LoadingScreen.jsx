import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import LottieView from "lottie-react-native";
import PropTypes from "prop-types";

import { COLORS } from "../constants/colorSchema";

const LoadingScreen = ({ backgroundColor = COLORS.primary }) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
      }}
    >
      <StatusBar backgroundColor={backgroundColor} hidden={false} />
      <LottieView
        source={require("../../assets/loties/burguer-loader.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Estamos preparando todo para ti!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    width: "55%",
    color: COLORS.dark,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Lato",
  },
});

LoadingScreen.propTypes = {
  backgroundColor: PropTypes.string,
};

export default LoadingScreen;
