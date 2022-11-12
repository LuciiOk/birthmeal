import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useOnboarding = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    isAlreadyLaunched();
  }, []);

  const isAlreadyLaunched = async () => {
    try {
      const value = await AsyncStorage.getItem("@alreadyLaunched");
      if (value == null) {
        AsyncStorage.setItem("@alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return isFirstLaunch;
};

export default useOnboarding;
