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
  date = moment(date).add(5, "sec");
  let dateN;

  if (moment(date).isBefore(moment())) {
    const day = moment(date).day() + 1;
    const month = moment(date).month() + 1;
    const year = moment().year() + 1;
    dateN = moment(`${day}/${month}/${year}:20:59:00`, "DD/MM/YYYY:HH:mm:ss");
  } else {
    dateN = moment(date);
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title + name + "! 🎉",
      body: message.body,
    },
    trigger: {
      date: dateN.toDate(),
      repeats: true,
    },
    channelId: "birthday",
  });
};
