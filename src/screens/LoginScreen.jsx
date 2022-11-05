import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUserDetails from "../components/SignUserDetails";
import Text from "../components/Text";
import Input from "../components/Input";
import NavForm from "../components/NavForm";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";

import { useForm } from "react-hook-form";

const LoginScreen = () => {
  const { login, loading, error } = useContext(AuthContext);
  const navigation = useNavigation();

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async ({ email, password }) => {
    const success = await login(email, password);
    if (success) {
      navigation.navigate("Home", { screen: "Overview" });
      reset();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

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
          control={control}
          name="email"
          rules={{ required: true }}
        />
        <Input
          placeholder="Tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="password"
          rules={{ required: true }}
        />
        {error && (
          <View style={styles.errorContainer}>
            <Text
              text="Correo o contraseña incorrectos"
              styles={styles.errorText}
            />
          </View>
        )}
        <SignUserDetails
          redirectText="Olvidaste tu contraseña?"
          to="ForgotPassword"
          alignText="right"
        />
      </View>
      <Button
        buttonText="Iniciar sesión"
        outlined
        action={handleSubmit(onSubmit)}
      />
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
  errorContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 16,
  },
});

export default LoginScreen;
