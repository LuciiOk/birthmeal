import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IonicIcon from "react-native-vector-icons/Ionicons";

import { COLORS } from "../constants/colorSchema";
import Separator from "../components/Separator";
import Text from "../components/Text";

const StablishmentDetail = (props) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = React.useState(false);

  const redirect = () => {
    WebBrowser.openBrowserAsync(props.route.params.stablishment.webUrl);
  };

  const goToLocations = () => {
    navigation.navigate("Locations", {
      stablishment: props.route.params.stablishment,
    });
  };

  const addToFavorites = () => {
    setFavorite(!favorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={props.route.params.stablishment.imageUrl}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Text text="Información" title bold />
            <IonicIcon
              name={favorite ? "heart" : "heart-outline"}
              size={28}
              color="#000"
              style={styles.heartIcon}
              onPress={addToFavorites}
            />
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
              <Text text="www.birthmeal.cl" light opaque />
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
            <Text
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas
              congue ligula ac quam viverra nec consectetur ante
              hendrerit. Donec et mollis dolor. Praesent et diam eget
            "
              opaque
              light
            />
          </View>
          <Separator />
        </View>
        <View style={styles.ratingContainer}>
          <Text text="Valoración" title bold />
          <View style={styles.starsContainer}>
            <IonicIcon name="star" size={24} color={COLORS.primary} />
            <IonicIcon name="star" size={24} color={COLORS.primary} />
            <IonicIcon name="star" size={24} color={COLORS.primary} />
            <IonicIcon name="star-outline" size={24} color={COLORS.primary} />
            <IonicIcon name="star-outline" size={24} color={COLORS.primary} />
          </View>
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
    width: "100%",
    paddingBottom: 10,
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


export default StablishmentDetail;
