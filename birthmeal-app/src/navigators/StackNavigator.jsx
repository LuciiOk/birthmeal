import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./Tabs";
import OnboardingScreen from "../screens/OnboardingScreen";
import StablishmentDetail from "../screens/StablishmentDetail";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Details" component={StablishmentDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
};



export default StackNavigator;
