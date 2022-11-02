import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    _getLocationAsync();
  }, []);

  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});

    const { coords } = userLocation;

    setLocation([coords.longitude, coords.latitude]);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        errorMsg,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
