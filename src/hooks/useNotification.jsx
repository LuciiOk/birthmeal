import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const message = {
  title: `Hey! Hoy es el cumpleaños de `,
  body: "No te olvides de saludarle! 🥳🎉",
};

export const scheduleUserBirthday = async (date, name) => {
  clearAllNotifications();
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("birthday", {
      name: "birthday",
      description: "Birthday notifications",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  // get current date with GMT-3
  const trigger = new Date()
  // subtract 3 hours to get GMT-3
  trigger.setHours(trigger.getHours() - 3)
  // add 3 seconds to current date
  trigger.setSeconds(trigger.getSeconds() + 3);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title + name,
      body: message.body,
    },
    trigger: {
      date: trigger,
      repeats: true,
      channelId: "birthday",
    }
  });
  // get when the notification is scheduled
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  notifications.forEach((notification) => {
    const date = new Date(notification.trigger["value"]);
    console.log(date, notification.trigger["value"]);
  });

  return notificationId;
};

const clearAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
