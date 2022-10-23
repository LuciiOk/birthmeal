import React, { createContext, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";


export const BirthdaysContext = createContext();

export const BirthdaysProvider = ({ children }) => {
  const { data, get, post, put, del } = useFetchData(
    "birthdays/profile",
    false
  );
  const [birthdays, setBirthdays] = useState(data);

  const addBirthday = ({ name, date }) => {
    const newBirthday = {
      name,
      date,
      id: birthdays.length + 1,
    };

    setBirthdays([...birthdays, newBirthday]);
  };

  const removeBirthday = (id) => {
    setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
  };

  const editBirthday = (id, name, date) => {
    const newBirthdays = birthdays.map((birthday) => {
      if (birthday.id === id) {
        birthday.name = name;
        birthday.date = date;
      }
      return birthday;
    });
  };

  const getAllBirthdays = () => {
    get();
  };

  const getBirthday = (id) => {
    get({ id });
  };

  const addBirthdayToDB = (name, date) => {
    post({ name, date });
  };

  const editBirthdayInDB = (id, name, date) => {
    put({ id, name, date });
  };

  const removeBirthdayFromDB = (id) => {
    del({ id });
  };

  useEffect(() => {
    setBirthdays(data);
  }, [data]);


  return (
    <BirthdaysContext.Provider
      value={{
        birthdays,
        addBirthday,
        removeBirthday,
        editBirthday,
        getAllBirthdays,
        getBirthday,
        addBirthdayToDB,
        editBirthdayInDB,
        removeBirthdayFromDB,
      }}
    >
      {children}
    </BirthdaysContext.Provider>
  );
};

// registerForPushNotificationsAsync().then((token) =>
//   setExpoPushToken(token)
// );

// const registerForPushNotificationsAsync = async () => {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// };
