import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Text from "../components/Text";
import InputDate from "../components/InputDate";
import Input from "../components/Input";
import SignUserDetails from "../components/SignUserDetails";
import ConditionTerms from "../components/ConditionTerms";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";
import LoadingScreen from "./LoadingScreen";
import { ConfirmPasswordResolver } from "../utils/ConfirmPasswordResolver";

const RegisterScreen = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ConfirmPasswordResolver),
    mode: "all",
  });
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
    return <LoadingScreen backgroundColor="#fff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
        />
        {errors.name && <Text text={errors.name.message} error />}
        <Input
          placeholder="Tu email"
          keyboardType="email-address"
          control={control}
          name="email"
        />
        {errors.email && <Text text={errors.email.message} error />}
        <Input
          placeholder="Tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="password"
        />
        {errors.password && <Text text={errors.password.message} error />}
        <Input
          placeholder="Confirma tu contraseña"
          keyboardType="default"
          isPassword
          control={control}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text text={errors.confirmPassword.message} error />
        )}
        <InputDate
          placeholder="Tu fecha de nacimiento"
          control={control}
          name="birthdate"
        />
        {errors.birthdate && <Text text={errors.birthdate.message} error />}
        <ConditionTerms control={control} name="conditionTerms" />
        <Button
          buttonText="Crear cuenta"
          outlined
          action={handleSubmit(onSubmit)}
          disabled={false}
        />
        {errors.conditionTerms && (
          <Text
            text={errors.conditionTerms.message}
            error
            styles={{ width: "50%", textAlign: "center" }}
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
