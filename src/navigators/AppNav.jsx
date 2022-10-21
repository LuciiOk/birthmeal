import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";
import { AuthContext } from "../contexts/AuthContext";

const AppNav = () => {
  const { user, token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default AppNav;