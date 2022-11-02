import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";

const StablishmentCard = ({ stablishment }) => {
  const navigator = useNavigation();

  const redirecTo = () => {
    navigator.navigate("Details", {
      title: stablishment.name,
      name: stablishment.name,
      stablishment,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={redirecTo}>
      <Image
        style={styles.image}
        source={
          stablishment.imageUrl ||
          require("../../assets/images/Burger-logo.png")
        }
      />
      <View style={styles.textContainer}>
        <Text text={stablishment.name} title bold cap />
        <Text text={stablishment.description} opaque cap />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 70,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
});

StablishmentCard.propTypes = {
  stablishment: PropTypes.object.isRequired,
};

export default StablishmentCard;
