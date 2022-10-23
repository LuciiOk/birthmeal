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

const RegisterScreen = () => {
  const [name, setName] = useState("luciano");
  const [email, setEmail] = useState("lportales85@gmail.com");
  const [password, setPassword] = useState("123");
  const [confirmPassword, setConfirmPassword] = useState("123");
  const [date, setDate] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);


  const { register, loading, error } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    if (!isSelected) {
      setErrorMessage("Debes aceptar los términos y condiciones");
      return;
    }
    const newUser = {
      name,
      birthdate: date,
      userAuth: {
        email,
        password,
        confirmPassword,
      },
    };
    await register(newUser);
    if (!error) {
      navigation.navigate("Home");
      return;
    }
    setErrorMessage("El email ingresado ya existe.");
    navigation.navigate("Register");
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

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
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
          onChangeText={handleName}
          value={name}
        />
        <Input
          placeholder="Tu email"
          keyboardType="email-address"
          onChangeText={handleEmail}
          value={email}
        />
        <Input
          placeholder="Tu contraseña"
          keyboardType="default"
          isPassword
          onChangeText={handlePassword}
          value={password}
        />

        <Input
          placeholder="Confirma tu contraseña"
          keyboardType="default"
          isPassword
          onChangeText={handleConfirmPassword}
          value={confirmPassword}
        />
        <InputDate
          placeholder="Tu fecha de nacimiento"
          date={date}
          changeDate={onChangeDate}
        />
        <ConditionTerms isSelected={isSelected} setSelection={setSelection} />
        {error && <Text text={errorMessage} styles={styles.error} />}
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
  formHeaderSubText: {
    color: COLORS.dark,
    fontSize: 16,
  },
  error: {
    color: COLORS.danger,
    fontSize: 16,
  },
});

export default RegisterScreen;
