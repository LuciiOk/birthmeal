import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const message = {
  title: "Hey! Hoy es el cumpleaños de ",
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
  const dob = new Date(date);
  const today = new Date();

  const day = dob.getDate();
  const month = dob.getMonth();
  const hour = today.getHours();
  const minute = today.getMinutes() + 1 === 60 ? 0 : dob.getMinutes() + 1;

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title + name,
      body: message.body,
    },
    trigger: {
      day,
      month,
      hour,
      minute,
      repeats: true,
    },
  });
  return notificationId;
};

export const clearAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const cancelNotification = async (notificationId) => {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
};
