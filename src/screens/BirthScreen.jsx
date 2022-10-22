import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";
import AddButton from "../components/AddButton";

import BirthdaysContainer from "../containers/BirthdaysContainer";
import { BirthdaysProvider } from "../contexts/BirthdaysContext";

const BirthScreen = () => {
  return (
    <BirthdaysProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text text="Cumpleaños" bold title />
        </View>
        <BirthdaysContainer />
        <AddButton />
      </View>
    </BirthdaysProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  body: {
    flex: 10,
    width: "100%",
  },
});

export default BirthScreen;
