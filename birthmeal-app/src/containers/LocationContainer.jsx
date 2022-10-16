import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Text from "../components/Text";
import LocationItem from "../components/LocationItem";

const LocationContainer = ({ locations, selectedLocation, setLocation }) => {

  return (
    <View style={styles.locationsContainer}>
      <View style={styles.locationHeader}>
        <Text text="Seleciona una ubicación:" bold />
      </View>
      <View style={styles.locationList}>
        {locations.map((location) => (
          <LocationItem
            key={location.id}
            name={location.name}
            address={location.address}
            selected={selectedLocation && selectedLocation.id === location.id}
            setLocation={() => setLocation(location)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  locationHeader: {
    padding: 10,
  },
  locationList: {
    flex: 1,
  },
});

LocationContainer.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ).isRequired,
  setLocation: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

export default LocationContainer;
