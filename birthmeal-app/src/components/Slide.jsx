import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

const Slide = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {item.place === "top" && (
          <Image source={item.image} style={styles.image} />
        )}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.place === "bottom" && (
          <Image source={item.image} style={styles.image} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 20,
  },
  content: {
    height: height * 0.75,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    color: "white",
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    fontFamily: "Lato",
    textAlign: "center",
    marginTop: 10,
  },
  image: {
    width: width * 0.7,
    height: "50%",
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 20,
  },
});

// add prop types
Slide.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Slide;
