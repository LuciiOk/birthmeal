import React from "react";
import { StyleSheet, View, Image } from "react-native";
import PropTypes from "prop-types";
import image from "./../../assets/images/Burger-Sleeping.png";

import Text from "./Text";

const NoData = ({ text }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={styles.image}
      />
      <Text
        text={text}
        bold
        styles={{
          textAlign: "center",
          fontSize: 18,
          width: "80%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
});

NoData.propTypes = {
  text: PropTypes.string,
};

export default NoData;
