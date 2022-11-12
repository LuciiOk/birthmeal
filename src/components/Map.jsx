import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

const Map = ({ latitude, longitude, ...props }) => {
  const mapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#afafaf",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [
        {
          saturation: "25",
        },
        {
          lightness: "46",
        },
        {
          gamma: "1.26",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          hue: "#ff0000",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          hue: "#ff0000",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#b6edb6",
        },
        {
          weight: "0.33",
        },
        {
          lightness: "16",
        },
        {
          saturation: "-17",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#ede4e4",
        },
        {
          saturation: "-63",
        },
        {
          gamma: "0.38",
        },
        {
          lightness: "61",
        },
      ],
    },
    {
      featureType: "poi.medical",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f4b4b4",
        },
        {
          saturation: "-16",
        },
        {
          lightness: "20",
        },
      ],
    },
    {
      featureType: "poi.medical",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#fbc99b",
        },
        {
          lightness: "12",
        },
        {
          gamma: "2.39",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          color: "#fdcb9b",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#f2af67",
        },
        {
          lightness: "47",
        },
        {
          saturation: "64",
        },
        {
          gamma: "0.95",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: "-18",
        },
        {
          lightness: "61",
        },
        {
          gamma: "7.93",
        },
        {
          weight: "0.30",
        },
        {
          color: "#db8828",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [
        {
          weight: "0.79",
        },
        {
          gamma: "3.19",
        },
        {
          lightness: "-73",
        },
        {
          saturation: "-76",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          invert_lightness: true,
        },
        {
          weight: "2.90",
        },
        {
          color: "#786e6e",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
        {
          color: "#5da554",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#7fd4ef",
        },
        {
          saturation: "13",
        },
        {
          lightness: "-3",
        },
        {
          gamma: "1.13",
        },
        {
          weight: "0.30",
        },
      ],
    },
    // remove labels
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
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
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
              latitudeDelta: 0.000060757,
              longitudeDelta: 0.009366,
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
