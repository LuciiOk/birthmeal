import React from "react";
import { useFonts } from "expo-font";

import AppNav from "./src/navigators/AppNav";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LocationProvider } from "./src/contexts/LocationProvider";

// EXPO-Notification
import * as Notifications from "expo-notifications";
import * as Constants from "expo-constants";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-semibold": require("./assets/fonts/Lato-Semibold.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  });

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Falló el registro para recibir notificaciones");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Debe usar un dispositivo físico para recibir notificaciones");
    }
  };

  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
