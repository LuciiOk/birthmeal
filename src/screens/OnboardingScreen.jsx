import React, { useContext } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { OnboardingContext } from "../contexts/OnboardingProvider";

import { slides } from "../data/slides";
const bgs = ["#ebcb8b", "#a3be8c", "#bf616a", "#59b2ab", "#ebcb8b"];
// a little bit of magic
const bgDarkers = ["#b48e3f", "#6f8c5a", "#8f4f56", "#3d7a7b", "#b48e3f"];

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ItemSlide item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

const ItemSlide = ({ item }) => {
  const { onFinished } = useContext(OnboardingContext);
  const index = slides.findIndex((slide) => slide.key === item.key);

  const navigation = useNavigation();

  const toLogin = () => {
    navigation.navigate("Login");
  };

  const toHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ width, alignItems: "center", padding: 20 }}>
      <View
        style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={item.image}
          style={{ width: width / 1.2, height: height, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flex: 0.35 }}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 10,
            color: "white",
            textAlign: "center",
            fontFamily: "Lato-Bold",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            textAlign: "center",
            fontWeight: "600",
            marginBottom: 40,
            fontFamily: "Lato",
          }}
        >
          {item.description}
        </Text>
        {index === slides.length - 1 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width,
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 30,
                width: width / 2 - 50,
                alignItems: "center",
              }}
              onPress={() => {
                toLogin();
                onFinished();
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Lato" }}
              >
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 30,
                width: width / 2 - 50,
                alignItems: "center",
                fontFamily: "Lato",
              }}
              onPress={() => {
                toHome();
                onFinished();
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Lato" }}
              >
                Comenzar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {slides.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 15,
              width: 15,
              borderRadius: 10,
              backgroundColor: "white",
              margin: 10,
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.divide(
    Animated.modulo(Animated.modulo(scrollX, width), width),
    new Animated.Value(width)
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  const scale = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.6, 1],
  });
  const backgroundColor = scrollX.interpolate({
    inputRange: bgDarkers.map((_, i) => i * width),
    outputRange: bgDarkers.map((bg) => `${bg}99`),
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor,
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }, { scale }],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

ItemSlide.propTypes = {
  item: PropTypes.object.isRequired,
};

Indicator.propTypes = {
  scrollX: PropTypes.object.isRequired,
};

Backdrop.propTypes = {
  scrollX: PropTypes.object.isRequired,
};

Square.propTypes = {
  scrollX: PropTypes.object.isRequired,
};

export default OnboardingScreen;
