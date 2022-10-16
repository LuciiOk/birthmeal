import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";
import AddButton from "../components/AddButton";

const BirthScreen = () => {
  return (
    <View style={styles.container}>
      <Text text="BirthScreen" title />
      <AddButton />
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

export default BirthScreen;
