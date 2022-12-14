import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import LoadingScreen from "./LoadingScreen";

const StablishmentDetail = ({ route }) => {
  const {
    stablishment: { id },
  } = route.params;
  const navigation = useNavigation();
  const [nearLocation, setNearLocation] = useState(null);
  const { location: coordinates } = useContext(LocationContext);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [stablishment, setStablishment] = useState(null);
  const [loading, setLoading] = useState(true);

  const redirect = () => {
    WebBrowser.openBrowserAsync(stablishment.webUrl);
  };

  const goToLocations = () => {
    navigation.navigate("Locations", {
      stablishment: stablishment,
      business_name: stablishment.name,
      companyId: stablishment.id,
    });
  };

  const processedText = (text) => {
    // remove double spaces
    text = text.replace(/\s\s+/g, " ");
    // add space if theres no space before a comma, dot, colon or -
    text = text.replace(/([.,:;])(\S)/g, "$1 $2");
    // add breakline after a :
    text = text.replace(/: /g, ": \n");
    return text;
  };

  const getNearLocation = async () => {
    const { data } = await AxiosInstance.post(`location/nearest/${id}`, {
      coordinates,
    });
    setLoading(false);
    setNearLocation(data);
  };

  useEffect(() => {
    const getStablishment = async () => {
      const { data } = await AxiosInstance.get(`companies/${id}`);
      setStablishment(data);
      await getNearLocation();
      setLoading(false);
    };
    getStablishment();
  }, []);

  useEffect(() => {
    if (coordinates) {
      getNearLocation();
    }
  }, [coordinates]);

  const removeHttp = (url) => {
    // remove http:// or https:// and www. and /
    return url
      .replace(/(^\w+:|^)\/\//, "")
      .replace("www.", "")
      .split("/")[0];
  };

  if (loading || !stablishment) {
    return <LoadingScreen backgroundColor="#fff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            (stablishment.imageUrl && {
              uri: stablishment.imageUrl,
            }) ||
            require("../../assets/images/Burger-logo.png")
          }
        />
      </View>
      <ScrollView
        style={styles.detailsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoHeader}>
          <Text text="Informaci??n" title bold />
          <FavoriteButton company={stablishment} />
        </View>
        <View style={{ ...styles.info, ...styles.locationSection }}>
          <Text text="Ubicaciones" semiBold styles={{ marginBottom: 5 }} />
          <TouchableOpacity onPress={goToLocations} style={styles.touch}>
            <Text
              text={nearLocation?.address || "No hay ubicaciones"}
              small
              opaque
              styles={styles.location}
            />
            <Icon
              name="angle-right"
              size={20}
              color={COLORS.primary}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.info }}>
          <Text text="Ir al sitio web" semiBold styles={{ marginBottom: 5 }} />
          <TouchableOpacity onPress={redirect} style={styles.touch}>
            <Text text={removeHttp(stablishment.webUrl)} opaque small />
            <Icon
              name="angle-right"
              size={20}
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
              marginBottom: 5,
            }}
          >
            <Text text="Beneficios" semiBold />
            <Tooltip
              isVisible={tooltipVisible}
              onClose={() => setTooltipVisible(false)}
              backgroundColor="transparent"
              content={
                <View>
                  <Text
                    text="Requisitos para obtener el beneficio:"
                    bold
                    titleCase
                  />
                  {stablishment?.benefits?.map((benefit) => (
                    <Text
                      text={`??? ${benefit}`}
                      small
                      key={benefit}
                      styles={{ marginTop: 5 }}
                      titleCase
                    />
                  ))}
                </View>
              }
              contentStyle={{
                backgroundColor: COLORS.white,
                padding: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: COLORS.dark,
                shadowColor: COLORS.dark,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => setTooltipVisible(!tooltipVisible)}
              >
                <Icon name="info-circle" size={24} color={`${COLORS.dark}90`} />
              </TouchableOpacity>
            </Tooltip>
          </View>
          <Text
            text={processedText(stablishment?.description || "")}
            opaque
            small
            literal
            titleCase
          />
        </View>
        <View style={styles.ratingContainer}>
          <Text text="Valoraci??n" title bold />
          <Valoration
            rat={stablishment.rating}
            stablishmentId={stablishment.id}
          />
        </View>
      </ScrollView>
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
    marginBottom: 5,
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
    marginBottom: 50,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touch: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    width: "90%",
  },
  arrowIcon: {
    width: "10%",
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
  },
});

StablishmentDetail.propTypes = {
  route: PropTypes.object,
  params: PropTypes.object,
};

export default StablishmentDetail;
