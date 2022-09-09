import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "../data/slides";
import Slide from "../components/Slide";
import { COLORS } from "../constants/colorSchema";
import FooterSlide from "../components/FooterSlide";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlideIndex] = React.useState(0);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary} />
      <Animated.FlatList
        data={slides}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ height: height * 0.85 }}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <FooterSlide index={currentSlide}></FooterSlide>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
