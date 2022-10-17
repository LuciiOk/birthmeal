import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "../components/Text";
import InputDate from "../components/InputDate";
import Input from "../components/Input";
import SignUserDetails from "../components/SignUserDetails";
import ConditionTerms from "../components/ConditionTerms";
import NavForm from "../components/NavForm";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";

const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("Home", {
      screen: "Overview",
    });
  };

  const handleName = (text) => {
    setName(text);
  };

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavForm />
      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formHeader}>
          <Text
            text="Creación de cuenta"
            bold
            title
            styles={styles.formHeaderText}
          />
        </View>
        <Input placeholder="Tu nombre" keyboardType="default" />
        <Input placeholder="Tu email" keyboardType="email-address" />
        <Input placeholder="Tu contraseña" keyboardType="default" isPassword />
        <Input
          placeholder="Confirma tu contraseña"
          keyboardType="default"
          isPassword
        />
        <InputDate placeholder="Tu fecha de nacimiento" />
        <ConditionTerms />
        <Button buttonText="Crear cuenta" action={handleSubmit} outlined />
        <SignUserDetails
          to="Login"
          text="¿Ya tienes una cuenta?"
          redirectText="Inicia sesión"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "center",
    marginTop: 30,
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
});

export default RegisterScreen;
