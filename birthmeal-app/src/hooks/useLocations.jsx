// hook for select location

import React from "react";

const useLocations = () => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const setLocation = (location) => {
    setSelectedLocation(location);
  };

  return [selectedLocation, setLocation];
};

export default useLocations;