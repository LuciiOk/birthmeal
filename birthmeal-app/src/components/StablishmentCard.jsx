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
      title: stablishment.title,
      name: stablishment.name,
      stablishment,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={redirecTo}>
      <Image style={styles.image} source={stablishment.imageUrl} />
      <View style={styles.textContainer}>
        <Text text={stablishment.title} title bold />
        <Text text={stablishment.description} opaque />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    height: 80,
    borderRadius: 15,
    padding: 10,
    marginVertical: 7,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    position: "absolute",
    left: 10,
    top: 7,
  },
  textContainer: {
    marginLeft: 80,
  },
});

StablishmentCard.propTypes = {
  stablishment: PropTypes.object.isRequired,
};

export default StablishmentCard;
