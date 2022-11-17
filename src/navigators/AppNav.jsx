import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";
import NetInfo from "@react-native-community/netinfo";

const AppNav = () => {
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    throw new Error("No internet connection");
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNav;
