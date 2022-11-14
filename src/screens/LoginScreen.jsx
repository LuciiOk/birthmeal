import React, { useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignUserDetails from "../components/SignUserDetails";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../utils/ConfirmPasswordResolver";

const LoginScreen = () => {
  const { login, loading, error } = useContext(AuthContext);
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(LoginSchema) });

  const onSubmit = async ({ email, password }) => {
    const success = await login(email, password);
    if (success) {
      navigation.navigate("Home", { screen: "Overview" });
      reset();
    }
  };

  if (loading) {
    return <LoadingScreen backgroundColor="#fff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        hidden={false}
      />
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
          error={errors.email}
        />
        <Input
          placeholder="Tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="password"
          error={errors.password}
        />
        {error && <Text text={JSON.stringify(error)} error />}
        <SignUserDetails
          redirectText="Olvidaste tu contraseña?"
          to="ForgotPassword"
          alignText="right"
        />
      </View>
      <Button
        buttonText="Iniciar sesión"
        filled
        action={handleSubmit(onSubmit)}
        buttonStyles={styles.button}
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
    backgroundColor: "white",
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
  button: {
    width: "80%",
    marginTop: 20,
    backgroundColor: COLORS.danger,
  },
});

export default LoginScreen;
