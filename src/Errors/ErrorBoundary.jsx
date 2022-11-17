import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";
import { Restart } from "fiction-expo-restart";
import Button from "../components/Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("el error es: ", error.message);

    // verify if error is a network error
    if (error.message === "No internet connection") {
      this.setState({
        message:
          "Revisa tu conexión a internet o vuelve a intentarlo más tarde",
      });
    }
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
          <Text
            text={this.state.message || "Vuelve a intentarlo más tarde"}
            displayTitle
            semiBold
            error
            styles={styles.text}
          />
          <Button
            buttonText="Reiniciar"
            action={() => Restart()}
            buttonStyles={styles.button}
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
  button: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.danger,
    marginTop: 10,
  },
});

export default ErrorBoundary;
