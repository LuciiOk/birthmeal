import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";
import FavoriteButton from "./FavoriteButton";

const StablishmentCard = ({ stablishment, favortie = false }) => {
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
          (stablishment.imageUrl && { uri: stablishment.imageUrl }) ||
          require("../../assets/images/Burger-logo.png")
        }
      />
      <View style={styles.textContainer}>
        <Text text={stablishment.name} subtitle bold cap titleCase />
        <Text
          text={stablishment.description}
          subtitle
          small
          opaque
          titleCase
          trunc={80}
        />
      </View>
      <View style={styles.favoriteContainer}>
        {favortie && (
          <FavoriteButton company={stablishment} noAnimate/>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});

StablishmentCard.propTypes = {
  stablishment: PropTypes.object.isRequired,
};

export default StablishmentCard;
