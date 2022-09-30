import React from "react";
import { View, Text, StyleSheet } from "react-native";


const StablishmentDetail = (props) => {
  console.log(props.route.params);
    return (
    <View style={styles.container}>
      <Text>StablishmentDetail</Text>
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

export default StablishmentDetail;
