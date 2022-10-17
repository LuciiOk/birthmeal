import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { slides } from "../data/slides";
import ButtonSlide from "./ButtonSlide";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const FooterSlide = ({ index: i, onNext, onSkip }) => {

  const navigator = useNavigation();

  const goToHome = () => {
    navigator.navigate("Home", {
      screen: "Overview",
    });
  };

  const goToLogin = () => {
    navigator.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicators}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, index === i ? styles.active : null]}
          />
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        {i === slides.length - 1 && (
          <>
            <ButtonSlide text="Login" action={goToLogin} />
            <ButtonSlide text="Get Started" action={goToHome} />
          </>
        )}
        {i !== slides.length - 1 && (
          <>
            <ButtonSlide text="SKIP" action={onSkip}/>
            <View style={{ width: 15 }} />
            <ButtonSlide text="NEXT" action={onNext} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.15,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: "#fefefe",
    marginHorizontal: 3,
    borderRadius: 8,
  },
  active: {
    width: 13,
    height: 13,
    backgroundColor: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

// add prop types
FooterSlide.propTypes = {
  index: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};


export default FooterSlide;
