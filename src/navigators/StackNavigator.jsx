import React, { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./Tabs";
import OnboardingScreen from "../screens/OnboardingScreen";
import StablishmentDetail from "../screens/StablishmentDetail";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LocationsScreen from "../screens/LocationsScreen";
import useOnboarding from "../hooks/useOnboarding";
import { AddModal } from "../components/AddButton";
import { AuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, token } = useContext(AuthContext);

  console.log("user", user);
  console.log("token", token);
  const isFirstLaunch = useOnboarding();

  return (
    isFirstLaunch !== null && (
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          {!isFirstLaunch && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Home" component={TabNavigator} />
          {!user && !token && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Details" component={StablishmentDetail} />
          <Stack.Screen name="Locations" component={LocationsScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Add"
            component={AddModal}
            options={{
              headerTitle: "Agregar cumpleaños",
              presentation: "modal",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    )
  );
};

export default StackNavigator;
