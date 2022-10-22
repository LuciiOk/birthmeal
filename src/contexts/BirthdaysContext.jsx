import React, { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import axios from "axios";

import { scheduleUserBirthday } from "../hooks/useNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const BirthdaysContext = createContext();

export const BirthdaysProvider = ({ children }) => {
  const [birthdays, setBirthdays] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addBirthday = ({ name, date }) => {
    const newBirthday = {
      name,
      date,
      id: birthdays.length + 1,
    };

    setBirthdays([...birthdays, newBirthday]);
    scheduleUserBirthday(date, name);
  };

  const removeBirthday = (id) => {
    setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
  };

  const getBirthdays = async () => {
    setBirthdays([]);
  };

  useEffect(() => {
    getBirthdays();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
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

    return token;
  };

  return (
    <BirthdaysContext.Provider
      value={{
        birthdays,
        loading,
        error,
        addBirthday,
        removeBirthday,
        getBirthdays,
      }}
    >
      {children}
    </BirthdaysContext.Provider>
  );
};
