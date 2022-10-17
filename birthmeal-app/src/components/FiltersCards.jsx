import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const FiltersCards = ({ filter }) => (
  <TouchableOpacity style={styles.container}>
    <FontAwesome name={filter.icon} size={30} color={COLORS.dark} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    borderRadius: 15,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

FiltersCards.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default FiltersCards;
