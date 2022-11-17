import React from "react";
import { StyleSheet, View } from "react-native";

import AddButton from "../components/AddButton";
import BirthdayProvider from "../contexts/BirthdayContext";
import BirthdaysContainer from "../containers/BirthdaysContainer";
import { COLORS } from "../constants/colorSchema";

const BirthScreen = () => {
  return (
    <BirthdayProvider>
      <View style={styles.container}>
        <BirthdaysContainer />
        <AddButton />
      </View>
    </BirthdayProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    width: "100%",
  },
});

export default BirthScreen;
