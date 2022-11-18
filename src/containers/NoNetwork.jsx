import React from "react";
import { View, Image, StyleSheet } from "react-native";
import image from "../../assets/images/Error.png";
import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";

const NoNetwork = () => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text title bold text="Oh no!," />
      <Text title bold text="No tienes conexión a internet." />
      <Text
        subtitle
        semiBold
        text="Revisa tu conexión y conectate a internet para continuar."
        styles={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    color: COLORS.frost4,
  },
});

export default NoNetwork;
