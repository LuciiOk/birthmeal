import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import * as Sentry from "sentry-expo";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("ErrorBoundary", error, info);
    Sentry.Native.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
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
  },
  text: {
    textAlign: "center",
  },
});

export default ErrorBoundary;
