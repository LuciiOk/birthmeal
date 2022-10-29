import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import { COLORS } from "../constants/colorSchema";
import Separator from "../components/Separator";
import Text from "../components/Text";
import FavoriteButton from "../components/FavoriteButton";
import Valoration from "../components/Valoration";

const StablishmentDetail = ({ route }) => {
  const navigation = useNavigation();

  const redirect = () => {
    // validate if the url is valid
    WebBrowser.openBrowserAsync(route.params.stablishment.webUrl);
  };

  const goToLocations = () => {
    navigation.navigate("Locations", {
      stablishment: route.params.stablishment,
      business_name: route.params.stablishment.name,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            route.params.stablishment.imageUrl ||
            require("../../assets/images/Burger-logo.png")
          }
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Text text="Información" title bold />
            <FavoriteButton id={route.params.stablishment.id} />
          </View>
          <View style={styles.info}>
            <Text text="Ubicaciones" semiBold />
            <TouchableOpacity onPress={goToLocations}>
              <Text
                text="Av. Valparaíso 1070, local 3044, Viña del Mar"
                light
                opaque
              />
              <FontAwesome
                name="angle-right"
                size={24}
                color={COLORS.primary}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={styles.info}>
            <Text text="Ir al sitio web" semiBold />
            <TouchableOpacity onPress={redirect}>
              <Text text={route.params.stablishment.webUrl} light opaque />
              <FontAwesome
                name="angle-right"
                size={24}
                color={COLORS.primary}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={styles.info}>
            <Text text="Beneficios" semiBold />
            <Text text={route.params.stablishment.description} opaque light />
          </View>
          <Separator />
        </View>
        <View style={styles.ratingContainer}>
          <Text text="Valoración" title bold />
          <Valoration rating={route.params.stablishment.rating} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 40,
  },
  detailsContainer: {
    width: "100%",
    height: "50%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  infoContainer: {
    paddingTop: 10,
    width: "100%",
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    width: "100%",
    paddingBottom: 10,
  },
  heartIcon: {
    position: "absolute",
    right: 0,
    color: "#FF0000",
  },
  ratingContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowIcon: {
    position: "absolute",
    right: 0,
  },
});

StablishmentDetail.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
};

export default StablishmentDetail;
