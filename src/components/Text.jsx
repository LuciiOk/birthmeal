import React from "react";
import { StyleSheet, Text as T } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const Text = ({
  text,
  bold,
  light,
  displayTitle,
  title,
  subtitle,
  opaque,
  semiBold,
  cap,
  styles,
  error,
  small,
  moreSmall,
  titleCase,
  trunc = null,
  literal = false,
  justify = false,
}) => {
  const textStyles = [
    stylesT.text,
    bold && stylesT.bold,
    light && stylesT.light,
    displayTitle && stylesT.displayTitle,
    title && stylesT.title,
    subtitle && stylesT.subtitle,
    opaque && stylesT.opaque,
    semiBold && stylesT.semiBold,
    cap && stylesT.cap,
    error && stylesT.error,
    small && stylesT.small,
    moreSmall && stylesT.moreSmall,
    justify && stylesT.justify,
  ];

  if (titleCase) {
    // only capitalize the first word of the string, not the whole string
    text = text.toLowerCase();

    // only capitalize the first word of the string or the first word after a dot

    text = text.replace(/(^\w{1})|(\.\s*\w{1})|(\-\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
  }

  const truncate = (str, n) => {
    // remove break lines
    str = str.replace(/(\r\n|\n|\r)/gm, "");
    // add space after each comma, :, ; and .
    str = str.replace(/([,;:.])/g, "$1 ");

    // truncate the string to n characters or if it has dots, to the last dot
    return str.length > n
      ? str.substr(0, str.lastIndexOf(" ", n)) + "..."
      : str;
  };

  if (trunc) {
    text = truncate(text, trunc);
  }

  return (
    <T style={[textStyles, styles]}>
      {!literal && text}
      {literal && `${text}`}
    </T>
  );
};

const stylesT = StyleSheet.create({
  text: {
    fontFamily: "Lato",
    fontSize: 16,
    color: COLORS.dark,
    letterSpacing: 0.7,
  },
  bold: {
    fontFamily: "Lato-Bold",
  },
  light: {
    fontFamily: "Lato-Light",
    fontWeight: "400",
  },
  displayTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 28,
  },
  title: {
    fontSize: 23,
  },
  subtitle: {
    fontSize: 18,
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
  error: {
    color: COLORS.danger,
    width: "100%",
    fontSize: 14,
  },
  small: {
    fontSize: 14,
  },
  moreSmall: {
    fontSize: 12,
  },
  justify: {
    textAlign: "justify",
  },
});

Text.propTypes = {
  text: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  displayTitle: PropTypes.bool,
  title: PropTypes.bool,
  subtitle: PropTypes.bool,
  opaque: PropTypes.bool,
  semiBold: PropTypes.bool,
  styles: PropTypes.object,
  cap: PropTypes.bool,
  error: PropTypes.bool,
};

export default Text;
