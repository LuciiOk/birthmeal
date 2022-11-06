import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import { COLORS } from "../constants/colorSchema";
import Text from "../components/Text";
import FavoriteButton from "../components/FavoriteButton";
import Valoration from "../components/Valoration";
import AxiosInstance from "../utils/AxiosInstance";
import Tooltip from "react-native-walkthrough-tooltip";

import { LocationContext } from "../contexts/LocationProvider";

const StablishmentDetail = ({ route }) => {
  const navigation = useNavigation();
  const [nearLocation, setNearLocation] = useState(null);
  const { location: coordinates } = useContext(LocationContext);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const redirect = () => {
    WebBrowser.openBrowserAsync(route.params.stablishment.webUrl);
  };

  const goToLocations = () => {
    navigation.navigate("Locations", {
      stablishment: route.params.stablishment,
      business_name: route.params.stablishment.name,
      companyId: route.params.stablishment.id,
    });
  };

  const getNearLocation = async () => {
    const { data } = await AxiosInstance.post(
      `location/nearest/${route.params.stablishment.id}`,
      { coordinates }
    );
    setNearLocation(data);
  };

  useEffect(() => {
    getNearLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            (route.params.stablishment.imageUrl && {
              uri: route.params.stablishment.imageUrl,
            }) ||
            require("../../assets/images/Burger-logo.png")
          }
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Text text="Información" title bold />
            <FavoriteButton company={route.params.stablishment} />
          </View>
          <View style={{ ...styles.info, ...styles.locationSection }}>
            <Text text="Ubicaciones" semiBold />
            <TouchableOpacity onPress={goToLocations}>
              <Text
                text={nearLocation?.address || "No hay ubicaciones"}
                light
                opaque
              />
              <Icon
                name="angle-right"
                size={24}
                color={COLORS.primary}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.info }}>
            <Text text="Ir al sitio web" semiBold />
            <TouchableOpacity onPress={redirect}>
              <Text text={route.params.stablishment.webUrl} light opaque />
              <Icon
                name="angle-right"
                size={24}
                color={COLORS.primary}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.info }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text text="Beneficios" semiBold />
              <Tooltip
                isVisible={tooltipVisible}
                onClose={() => setTooltipVisible(false)}
                backgroundColor="transparent"
                content={
                  <View
                  >
                    <Text
                      text="Requisitos para obtener el beneficio:"
                      semiBold
                    />
                    {route.params.stablishment.benefits.map((benefit) => (
                      <Text
                        text={`• ${benefit}`}
                        light
                        key={benefit}
                        styles={{ marginTop: 10 }}
                      />
                    ))}
                  </View>
                }
                contentStyle={{
                  backgroundColor: COLORS.white,
                  padding: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: COLORS.danger,
                }}
              >
                <TouchableOpacity
                  onPress={() => setTooltipVisible(!tooltipVisible)}
                >
                  <Icon
                    name="info-circle"
                    size={24}
                    color={`${COLORS.dark}90`}
                  />
                </TouchableOpacity>
              </Tooltip>
            </View>
            <Text text={route.params.stablishment.description} opaque light />
          </View>
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
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  detailsContainer: {
    width: "100%",
    height: "50%",
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    paddingBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
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
    backgroundColor: `${COLORS.primary}10`,
    position: "absolute",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    right: 0,
  },
  locationSection: {},
});

StablishmentDetail.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
};

export default StablishmentDetail;
