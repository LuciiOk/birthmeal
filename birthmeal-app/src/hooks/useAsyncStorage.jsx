import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(initialValue);

  React.useEffect(() => {
    try {
      AsyncStorage.getItem(key).then((value) => {
        if (value == null) {
          AsyncStorage.setItem(key, initialValue);
          setStoredValue(initialValue);
        } else {
          setStoredValue(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [storedValue, setStoredValue];
};

export default useAsyncStorage;
