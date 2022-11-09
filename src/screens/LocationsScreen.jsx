import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";

import MapView from "react-native-maps";
import PropTypes from "prop-types";

import Map from "../components/Map";
import LocationContainer from "../containers/LocationContainer";
import AxiosInstance from "./../utils/AxiosInstance";
import LoadingScreen from "./LoadingScreen";
import { LocationContext } from "../contexts/LocationProvider";

const LocationsScreen = ({ route }) => {
  const { params } = route;
  const { companyId } = params;
  const [locationsData, setLocationsData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const { location: coordinates } = useContext(LocationContext);

  const getLocations = async () => {
    try {
      const { data } = await AxiosInstance.post(
        `location/nearests/${companyId}`,
        { coordinates }
      );
      setLocationsData(data);
      setSelectedLocation(data[0].geometry);
      setLoading(false);
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
