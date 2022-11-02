import React, { useContext } from "react";
import { useFonts } from "expo-font";

import AppNav from "./src/navigators/AppNav";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocationProvider } from "./src/contexts/LocationProvider";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-semibold": require("./assets/fonts/Lato-Semibold.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LocationProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </LocationProvider>
  );
}
