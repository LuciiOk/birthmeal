import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PropTypes from "prop-types";

import Text from "../components/Text";
import LocationItem from "../components/LocationItem";
import NoData from "../components/NoData";

const LocationContainer = ({ locations, selectedLocation, setLocation }) => {
  return (
    <View style={styles.locationsContainer}>
      <View style={styles.locationHeader}>
        <Text text="Seleciona una ubicación:" title bold />
      </View>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.place_id + item.id}
        renderItem={({ item }) => (
          <LocationItem
            name={item.name}
            address={item.address}
            selected={item.geometry === selectedLocation}
            setLocation={() => setLocation(item.geometry)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoData text="No hay ubicaciones disponibles" />}
      />
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      geometry: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      }).isRequired,
    })
  ).isRequired,
  setLocation: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
};

export default LocationContainer;
