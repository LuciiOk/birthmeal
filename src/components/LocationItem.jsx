import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Text from "./Text";

import { COLORS } from '../constants/colorSchema';

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
          <View style={styles.selectedLocationTextContainer}>
            <Text text={name} subtitle bold />
            <Text text={address} light />
          </View>
        </View>
      )}
      {!selected && (
        <>
          <Text text={name} subtitle bold />
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
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedLocationIcon: {
    color: `${COLORS.danger}`,
    marginRight: 10,
    backgroundColor: `${COLORS.danger}10`,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  selectedLocationTextContainer: {
    flex: 1,
    flexWrap: "nowrap",
  },
});

export default LocationItem;
