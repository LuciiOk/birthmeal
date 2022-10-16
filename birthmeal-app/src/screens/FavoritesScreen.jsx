import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text text="FavoritesScreen" title />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
