import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Map from "../components/Map";
import LocationContainer from "../containers/LocationContainer";
import useLocations from "../hooks/useLocations";

const LocationsScreen = () => {
  const locationList = [
    {
      id: 1,
      name: "Casa de la cultura",
      address: "Calle 1 # 2 - 3",
      latitude: 4.60971,
      longitude: -74.08175,
    },
    {
      id: 2,
      name: "Casa de la cultura",
      address: "Calle 1 # 2 - 3",
      latitude: 20.60971,
      longitude: -74.08175,
    },
    {
      id: 3,
      name: "Casa de la cultura",
      address: "Calle 1 # 2 - 3",
      latitude: 4.60971,
      longitude: -24.08175,
    },
  ];

  const [selectedLocation, setLocation] = useLocations();

  return (
    <View style={styles.container}>
      <Map
        latitude={selectedLocation ? selectedLocation.latitude : null}
        longitude={selectedLocation ? selectedLocation.longitude : null}
      >
        {locationList.map((location) => (
          <MapView.Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.address}
          />
        ))}
      </Map>
      <LocationContainer
        locations={locationList}
        setLocation={setLocation}
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

export default LocationsScreen;
