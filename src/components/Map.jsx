import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

const Map = ({ latitude, longitude, ...props }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 4.60971,
        longitude: -74.08175,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }}
      region={
        latitude && longitude
          ? {
              latitude,
              longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }
          : null
      }
    >
      { props.children }
    </MapView>
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "45%",
  },
});


export default Map;