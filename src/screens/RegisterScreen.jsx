import React, { useContext, useState } from "react";
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
import { AuthContext } from "../contexts/AuthContext";

import LoadingScreen from "./LoadingScreen";

import { useForm } from "react-hook-form";

const RegisterScreen = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const navigation = useNavigation();

  const { register, loading, error } = useContext(AuthContext);

  const onSubmit = async ({
    email,
    password,
    name,
    confirmPassword,
    birthdate,
  }) => {
    const newUser = {
      name,
      birthdate,
      userAuth: {
        email,
        password,
        confirmPassword,
      },
    };
    const success = await register(newUser);
    if (success) {
      navigation.navigate("Home");
      reset();
      return;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

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
          <Text
            text="Ingresa tus datos para crear tu cuenta"
            styles={styles.formHeaderSubText}
          />
        </View>
        <Input
          placeholder="Tu nombre"
          keyboardType="default"
          control={control}
          name="name"
          rules={{ required: true }}
        />
        {errors.name && <Text text="El nombre es requerido" error />}
        <Input
          placeholder="Tu email"
          keyboardType="email-address"
          control={control}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
        />
        {(errors?.email?.type === "required" && (
          <Text text="El correo electrónico es requerido" error />
        )) ||
          (errors.email && errors?.email?.type === "pattern" && (
            <Text text="El correo electrónico no es válido" error />
          ))}
        <Input
          placeholder="Tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="password"
          rules={{ required: true, minLength: 6 }}
        />
        {errors.password?.type === "required" && (
          <Text text="La contraseña es requerida" error />
        )}
        {errors?.password?.type === "minLength" && (
          <Text text="La contraseña debe tener al menos 6 caracteres" error />
        )}
        <Input
          placeholder="Confirma tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="confirmPassword"
          rules={{ required: true, minLength: 6 }}
        />
        {errors?.confirmPassword?.type === "required" && (
          <Text text="La contraseña es requerida" error />
        )}
        {errors?.confirmPassword?.type === "minLength" && (
          <Text text="La contraseña debe tener al menos 6 caracteres" error />
        )}
        <InputDate
          placeholder="Tu fecha de nacimiento"
          control={control}
          name="birthdate"
          rules={{ required: true }}
        />
        {errors.birthdate && (
          <Text text="La fecha de nacimiento es requerida" error />
        )}
        <ConditionTerms
          control={control}
          name="conditionTerms"
          rules={{
            required: "Debes aceptar los términos y condiciones",
          }}
        />
        <Button
          buttonText="Crear cuenta"
          outlined
          action={handleSubmit(onSubmit)}
          disabled={false}
        />
        {errors.conditionTerms && (
          <Text
            text={errors.conditionTerms.message}
            styles={{ width: "50%", textAlign: "center" }}
            error
          />
        )}
        {error && (
          <Text
            text={error}
            error
            styles={{ width: "50%", textAlign: "center" }}
          />
        )}
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
  formHeaderSubText: {
    color: COLORS.dark,
    fontSize: 16,
  },
});

export default RegisterScreen;
