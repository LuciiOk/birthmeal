import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import MapView from "react-native-maps";
import PropTypes from "prop-types";

import Map from "../components/Map";
import LocationContainer from "../containers/LocationContainer";
import AxiosInstance from "./../utils/AxiosInstance";
import LoadingScreen from "./LoadingScreen";

const LocationsScreen = ({ locations, business_name = "starbucks", route }) => {
  // get params from props
  const { params } = route;
  const { business_name: businessName } = params;

  const [locationsData, setLocationsData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocations = async () => {
    try {
      const { data } = await AxiosInstance.get(`google-maps/${businessName}`);
      console.log(data);
      setLocationsData(data);
      setSelectedLocation(data[0].geometry);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getLocations();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Map
        latitude={selectedLocation.coordinates[1]}
        longitude={selectedLocation.coordinates[0]}
        latitudeDelta={0.004757}
        longitudeDelta={0.006866}
      >
        {locationsData.map(({ geometry, name, address, _id }) => (
          <MapView.Marker
            key={_id+name+address}
            coordinate={{
              latitude: geometry.coordinates[1],
              longitude: geometry.coordinates[0],
              latitudeDelta: 0.0000000757,
              longitudeDelta: 0.000066,
            }}
            title={address}
            description={address}
          />
        ))}
      </Map>
      <LocationContainer
        locations={locationsData}
        setLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
