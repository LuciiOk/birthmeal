import React from "react";
import { useFonts } from "expo-font";

import AppNav from "./src/navigators/AppNav";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocationProvider } from "./src/contexts/LocationProvider";
import { Platform } from "react-native";
import * as Device from "expo-device";
// device import
import * as Notifications from "expo-notifications";
import { FavoritesProvider } from "./src/contexts/FavoritesProvider";
import { OnboardingProvider } from "./src/contexts/OnboardingProvider";
import ErrorBoundary from "./src/Errors/ErrorBoundary";
import { NetworkProvider } from "./src/contexts/NetworkProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function App() {
  const [expoPushToken, setExpoPushToken] = React.useState("");

  const [fontsLoaded] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-semibold": require("./assets/fonts/Lato-Semibold.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  });

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <NetworkProvider>
        <OnboardingProvider>
          <LocationProvider>
            <AuthProvider>
              <FavoritesProvider>
                <AppNav />
              </FavoritesProvider>
            </AuthProvider>
          </LocationProvider>
        </OnboardingProvider>
      </NetworkProvider>
    </ErrorBoundary>
  );
}

export default App;
