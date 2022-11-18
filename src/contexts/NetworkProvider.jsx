import React, { createContext } from "react";
import * as NetInfo from "@react-native-community/netinfo";

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [networkState, setNetworkState] = React.useState({
    isConnected: true,
    isInternetReachable: true,
  });

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected, isInternetReachable } = state;
      console.log("isConnected", isConnected);

      setNetworkState({ isConnected, isInternetReachable });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        networkState,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
