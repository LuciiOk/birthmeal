import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { navigationRef } from "./src/utils/RootNavigation";

import StackNavigator from "./src/navigators/StackNavigator";


export default function App() {
  const [fontsLoaded] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-semibold": require("./assets/fonts/Lato-Semibold.ttf"),
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}
