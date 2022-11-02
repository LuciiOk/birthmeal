import React from "react";
import { StyleSheet, Text as T } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Text = ({ text, bold, light, title, subtitle, opaque, semiBold, cap, styles }) => {
  const textStyles = [
    stylesT.text,
    bold && stylesT.bold,
    light && stylesT.light,
    title && stylesT.title,
    subtitle && stylesT.subtitle,
    opaque && stylesT.opaque,
    semiBold && stylesT.semiBold,
    cap && stylesT.cap,
  ];

  return <T style={[textStyles, styles]}>{text}</T>;
};

const stylesT = StyleSheet.create({
  text: {
    fontFamily: "Lato",
    fontSize: 16,
    color: COLORS.dark,
  },
  bold: {
    fontFamily: "Lato-Bold",
  },
  light: {
    fontFamily: "Lato-Light",
    fontWeight: "400",
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 17,
  },
  opaque: {
    opacity: 0.75,
  },
  semiBold: {
    fontFamily: "Lato-semibold",
    fontWeight: "600",
  },
  cap: {
    textTransform: "capitalize",
  },
});

Text.propTypes = {
  text: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  title: PropTypes.bool,
  opaque: PropTypes.bool,
  semiBold: PropTypes.bool,
  styles: PropTypes.object,
};

export default Text;
