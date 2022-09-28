import React from "react";
import { StyleSheet, Text as T } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Text = ({ text, bold, light, title, opaque }) => {
  const textStyles = [
    styles.text,
    bold && styles.bold,
    light && styles.light,
    title && styles.title,
    opaque && styles.opaque,
  ];

  return <T style={textStyles}>{text}</T>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato",
    fontSize: 14,
    color: COLORS.dark,
  },
  bold: {
    fontWeight: "bold",
  },
  light: {
    fontWeight: "300",
  },
  title: {
    fontSize: 18,
  },
  opaque: {
    opacity: 0.75,
  },
});

Text.propTypes = {
  text: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  title: PropTypes.bool,
  opaque: PropTypes.bool,
};

export default Text;
