import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("el error es: ", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Image
            source={require("./../../assets/images/Error.png")}
            style={styles.image}
          />
          <Text
            text="Lo sentimos, ha ocurrido un error :("
            displayTitle
            semiBold
            styles={styles.text}
          />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  text: {
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default ErrorBoundary;
