import React from "react";

const useLocations = (initialValue) => {
  const [selectedLocation, setSelectedLocation] = React.useState(initialValue);

  const setLocation = (location) => {
    setSelectedLocation(location);
  };

  return [selectedLocation, setLocation];
};

export default useLocations;