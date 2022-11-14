import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

import MapView from "react-native-maps";
import PropTypes from "prop-types";

import Map from "../components/Map";
import LocationContainer from "../containers/LocationContainer";
import AxiosInstance from "./../utils/AxiosInstance";
import LoadingScreen from "./LoadingScreen";
import { LocationContext } from "../contexts/LocationProvider";
import { COLORS } from "../constants/colorSchema";
import Text from "../components/Text";
import * as Linking from "expo-linking";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDirections } from "@fortawesome/free-solid-svg-icons";
import { sortLocationsByDistance } from "../utils/distance";

const LocationsScreen = ({ route }) => {
  const { params } = route;
  const { companyId } = params;
  const [locationsData, setLocationsData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { location: coordinates } = useContext(LocationContext);

  const getLocations = async () => {
    try {
      if (coordinates) {
        const { data } = await AxiosInstance.post(
          `location/nearests/${companyId}`,
          // { 
          //   coordinates: [coordinates[1], coordinates[0]],
          // }
        );

        const sortedLocations = sortLocationsByDistance(data, coordinates);

        setLocationsData(sortedLocations);
        setSelectedLocation(data[0].geometry);
        setSelectedLocationId(data[0].id);
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  if (loading) return <LoadingScreen backgroundColor="white" />;

  return (
    <View style={styles.container}>
      <Map
        latitude={selectedLocation?.coordinates[1] || 0}
        longitude={selectedLocation?.coordinates[0] || 0}
      >
        {locationsData.map(({ geometry, name, address, id }) => (
          <MapView.Marker
            key={id}
            coordinate={{
              latitude: geometry.coordinates[1],
              longitude: geometry.coordinates[0],
              latitudeDelta: 0.0000000757,
              longitudeDelta: 0.000066,
            }}
            title={address}
            description={address}
            pinColor={
              {
                true: "red",
                false: "blue",
              }[selectedLocationId === id]
            }
            onPress={() => {
              setSelectedLocation(geometry);
              setSelectedLocationId(id);
            }}
          >
            <Image
              source={require("../../assets/images/marker.png")}
              style={[
                styles.marker,
                {
                  tintColor:
                    selectedLocationId === id
                      ? COLORS.darkDanger
                      : COLORS.primary,
                },
              ]}
              resizeMode="contain"
            />
            {/* card */}
            <MapView.Callout
              tooltip
              onPress={() => {
                // redirect to google maps
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&destination=${geometry.coordinates[1]},${geometry.coordinates[0]}`
                );
              }}
            >
              <View style={styles.callout}>
                <Text bold moreSmall trunc={25} text={`Ir a ${name}`} />
                <FontAwesomeIcon
                  icon={faDirections}
                  size={20}
                  color={COLORS.info}
                />
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </Map>
      <LocationContainer
        locations={locationsData}
        setLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
        selectedLocationId={selectedLocationId}
        setSelectedLocationId={setSelectedLocationId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
  },
  callout: {
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 10,
    zIndex: 100,
    width: 200,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

LocationsScreen.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ),
};

export default LocationsScreen;
