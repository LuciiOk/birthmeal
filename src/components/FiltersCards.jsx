import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const FiltersCards = ({ filter }) => (
  <TouchableOpacity style={styles.container}>
    {/* <FontAwesomeIcon icon={filter} size={40} /> */}
    <Text text={filter.name || 'dsfsdf'} styles={styles.text}/>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 80,
    width: 80,
    borderRadius: 15,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: COLORS.primary,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.primary,
    fontSize: 15,
    textAlign: "center",
  },
});

FiltersCards.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default FiltersCards;
