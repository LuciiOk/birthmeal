import React from "react";
import { View, StyleSheet, StatusBar, Text, Animation } from "react-native";
import LottieView from "lottie-react-native";

import { COLORS } from "../constants/colorSchema";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <LottieView
        source={require("../../assets/loties/burguer-loader.json")}
        autoPlay
        loop
        style={styles.animation}
      />  
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

});

export default LoadingScreen;
