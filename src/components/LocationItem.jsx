import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Text from "./Text";

const LocationItem = ({ name, address, selected, setLocation }) => {
  return (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={(location) => setLocation(location)}
    >
      {selected && (
        <View style={styles.selectedLocation}>
          <FontAwesome
            name="map-marker"
            size={24}
            style={styles.selectedLocationIcon}
          />
          <View>
            <Text text={name} bold />
            <Text text={address} light />
          </View>
        </View>
      )}
      {!selected && (
        <>
          <Text text={name} bold />
          <Text text={address} light />
        </>
      )}
    </TouchableOpacity>
  );
};

LocationItem.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  setLocation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  locationItem: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedLocationIcon: {
    color: "red",
    marginRight: 10,
  },
});

export default LocationItem;
