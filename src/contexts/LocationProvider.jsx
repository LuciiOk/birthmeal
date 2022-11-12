import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [permission, setPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setPermission(status);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const newLocation = [latitude, longitude];
      setLocation(newLocation);
    } catch (error) {
      console.log(error);
    }
  };

  const watchLocation = async () => {
    try {
      const location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 25000, // 25 seconds
          distanceInterval: 10, // 10 meters
        },
        (updatedLocation) => {
          const { latitude, longitude } = updatedLocation.coords;
          const newLocation = [latitude, longitude];
          setLocation(newLocation);
        }
      );
      return location;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (permission === "granted") {
      getLocation();
      watchLocation();
    }
  }, [permission]);

  return (
    <LocationContext.Provider
      value={{
        location,
        getLocation,
        watchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
