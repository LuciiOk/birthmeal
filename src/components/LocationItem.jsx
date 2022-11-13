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
            size={20}
            style={styles.selectedLocationIcon}
          />
          <View style={styles.selectedLocationTextContainer}>
            <Text text={name} bold />
            <Text text={address} opaque small />
          </View>
        </View>
      )}
      {!selected && (
        <>
          <Text text={name} bold />
          <Text text={address} opaque small />
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
    marginBottom: 15,
  },
  selectedLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedLocationIcon: {
    color: `${COLORS.danger}`,
    marginRight: 10,
    backgroundColor: `${COLORS.danger}10`,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  selectedLocationTextContainer: {
    flex: 1,
    flexWrap: "nowrap",
  },
});

export default LocationItem;
