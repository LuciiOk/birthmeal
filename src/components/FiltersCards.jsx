import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const FiltersCards = ({ filter }) => (
  <TouchableOpacity style={styles.container}>
    <FontAwesomeIcon
      icon={Icons["faAngleDown"]}
      size={24}
      color={filter.color}
    />
    <Text
      text={filter.name || ""}
      styles={{
        ...styles.text,
        color: filter.color,
      }}
      semiBold
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
    flexDirection: "row",
  },
  text: {
    color: COLORS.primary,
    fontSize: 18,
    textAlign: "center",
    // lowercase
    textTransform: "capitalize",
  },
});

FiltersCards.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default FiltersCards;
