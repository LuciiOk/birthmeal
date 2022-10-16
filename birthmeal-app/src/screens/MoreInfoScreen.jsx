import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";

const MoreInfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text="Información adicional" title />
      </View>
      <View style={styles.content}>
        <Text text="Información adicional" title />
      </View>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreInfoScreen;
