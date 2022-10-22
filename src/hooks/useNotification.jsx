import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import moment from "moment";

const message = {
  title: `Hey! Hoy es el cumpleaños de `,
  body: "No te olvides de saludarle! 🥳🎉",
};

export const scheduleUserBirthday = async (date, name) => {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("birthday", {
      name: "birthday",
      description: "Birthday notifications",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  date = moment(date).add(5, "seconds").toDate();

  const trigger = moment(date).toDate();
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title + name + "! 🎉",
      body: message.body,
    },
    trigger: {
      date: trigger,
      repeats: true,
    },
    channelId: "birthday",
  });
};
