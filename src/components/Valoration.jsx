import React from "react";
import { View, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const Valoration = ({ rating }) => {
  const getStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Icons name="star" size={20} color="#FFD700" key={i} />);
      } else {
        stars.push(<Icons name="star" size={20} color="#C0C0C0" key={i} />);
      }
    }
    return stars;
  };

  return <View style={styles.container}>{getStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

Valoration.propTypes = {
  rating: PropTypes.number,
};

export default Valoration;
