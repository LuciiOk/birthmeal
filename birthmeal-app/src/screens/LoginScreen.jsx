import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUserDetails from "../components/SignUserDetails";
import Text from "../components/Text";
import Input from "../components/Input";
import NavForm from "../components/NavForm";
import { COLORS } from "../constants/colorSchema";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("Home", {
      screen: "Overview",
    });
  };

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavForm />
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text
            text="Bienvenido a Birthmeal!"
            bold
            title
            styles={styles.formHeaderText}
          />
        </View>
        <Input
          placeholder="Tu correo electrónico"
          keyboardType="email-address"
        />
        <Input placeholder="Tu contraseña" keyboardType="default" isPassword />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text text="Iniciar sesión" bold styles={{ color: COLORS.dark }} />
      </TouchableOpacity>
      <SignUserDetails
        to="Register"
        text="¿No tienes una cuenta?"
        redirectText="Regístrate"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    paddingHorizontal: 20,
  },
  formHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  formHeaderText: {
    color: COLORS.dark,
    fontSize: 28,
  },
  button: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: COLORS.dark,
  },
});

export default LoginScreen;
