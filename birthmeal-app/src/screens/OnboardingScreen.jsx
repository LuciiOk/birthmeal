import React, { useEffect } from "react";
import { Dimensions, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "../data/slides";
import Slide from "../components/Slide";
import FooterSlide from "../components/FooterSlide";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  useEffect(() => {
    StatusBar.setBarStyle('default');
    StatusBar.setBackgroundColor('#f6d365');
  }, []);

  const updateCurrentSlideIndex = (e) => {
    const { contentOffset } = e.nativeEvent;
    const index = Math.round(contentOffset.x / width);
    setCurrentSlideIndex(index);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset, animated: true });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const onSkip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={["#f6d365", "#fda085"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
      >
        <FlatList
          ref={ref}
          data={slides}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ height: height * 0.85 }}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          renderItem={({ item }) => <Slide item={item} />}
          keyExtractor={({ key }) => key}
        />
        <FooterSlide
          index={currentSlide}
          onNext={goToNextSlide}
          onSkip={onSkip}
          navigation={navigation}
        ></FooterSlide>
      </LinearGradient>
    </SafeAreaView>
  );
};

OnboardingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default OnboardingScreen;
