import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Map = ({ latitude, longitude, ...props }) => {
  const mapStyle = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        {
          saturation: "32",
        },
        {
          lightness: "-3",
        },
        {
          visibility: "on",
        },
        {
          weight: "1.18",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "all",
      stylers: [
        {
          saturation: "-70",
        },
        {
          lightness: "14",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
        {
          lightness: "5",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          saturation: "100",
        },
        {
          lightness: "-14",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        {
          lightness: "12",
        },
      ],
    },
    // change color of roads
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: `${COLORS.light}`,
        },
      ],
    },
    // water color
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: `${COLORS.frost2}`,
        },
      ],
    },
    // change color of labels
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    // change color of labels
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: COLORS.dark,
        },
      ],
    },
    // change color of street labels
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: COLORS.dark,
        },
      ],
    },
    // change color of metro stations
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: COLORS.dark,
        },
      ],
    },
    // change color of metro stations icons
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: COLORS.dark,
        },
      ],
    },
  ];

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 4.60971,
        longitude: -74.08175,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
      region={
        latitude && longitude
          ? {
              latitude,
              longitude,
              latitudeDelta: 0.000100757,
              longitudeDelta: 0.01209,
            }
          : null
      }
      showsUserLocation
      showsCompass={false}
      showsBuildings={false}
      showsIndoors={false}
      showsTraffic={false}
      showsPointsOfInterest={false}
      customMapStyle={mapStyle}
    >
      {props.children}
    </MapView>
  );
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "50%",
  },
});

export default Map;
