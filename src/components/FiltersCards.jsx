import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const FiltersCards = ({ filter, setQuery, isSelected }) => {
  const handlePress = () => {
    if (filter.name === "Limpar") {
      setQuery("Limpar");
      return;
    }
    setQuery(filter.name);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && {
          backgroundColor: `${filter.color}40`,
          borderColor: filter.color,
        },
        !isSelected && {
          backgroundColor: `${filter.color}08`,
          borderColor: filter.color,
        },
      ]}
      onPress={() => handlePress()}
    >
      <FontAwesomeIcon
        icon={Icons[filter.icon || "faSearch"]}
        size={24}
        color={filter.color}
        style={styles.icon}
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
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: COLORS.primary,
    fontSize: 18,
    textAlign: "center",
    marginLeft: 10,
    textTransform: "capitalize",
    backgroundColor: "transparent",
  },
});

FiltersCards.propTypes = {
  filter: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default FiltersCards;
