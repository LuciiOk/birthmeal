import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";

const AppNav = () => {
  return (
    <NavigationContainer>
      <StackNavigator /> 
    </NavigationContainer>
  );
}

export default AppNav;