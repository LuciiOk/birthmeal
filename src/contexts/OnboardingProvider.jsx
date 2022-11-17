import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingContext = createContext();

const OnboardingProvider = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  onFinished = () => {
    AsyncStorage.setItem("@first", "true");
    setIsFirstLaunch(false);
  };

  const checkIfFirstLaunch = async () => {
    AsyncStorage.getItem("@first").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("@first", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  };

  React.useEffect(() => {
    checkIfFirstLaunch();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        isFirstLaunch,
        onFinished,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export { OnboardingContext, OnboardingProvider };
