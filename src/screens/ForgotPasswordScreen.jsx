import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text as T,
  Dimensions,
} from "react-native";
import Text from "../components/Text";
import Input from "../components/Input";

import AxiosInstance from "../utils/AxiosInstance";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { COLORS } from "../constants/colorSchema";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { RecoverPassword } from "../utils/ConfirmPasswordResolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";

const { width: screenWidth } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [step, setStep] = React.useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "all",
  });

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(RecoverPassword),
    mode: "all",
  });

  const [error, setError] = useState(null);

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AxiosInstance.post("/auth/forgot-password", {
        email,
      });
      if (response.status === 201) {
        setStep(2);
        return;
      }
      setLoading(false);
    } catch (e) {
      console.log(error);
      if (Array.isArray(e.response.data.message)) {
        setError(e.response.data.message[0]);
      } else {
        setError(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitCode = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const code = value.toString();
      const response = await AxiosInstance.post("/auth/verify", {
        code,
        email: data.email,
      });
      if (response.status === 200) {
        setStep(3);
        return;
      }
    } catch (e) {
      console.log(e.response.data);
      if (Array.isArray(e.response.data.message)) {
        setError(e.response.data.message[0]);
      } else {
        setError(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitNewPassword = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AxiosInstance.post("/auth/reset-password", {
        email: getValues("email"),
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log(response);
      if (response.status === 201) {
        setStep(4);
        return;
      }
    } catch (e) {
      console.log(e.response.data);
      // if is array
      if (Array.isArray(e.response.data.message)) {
        setError(e.response.data.message[0]);
      } else {
        setError(e.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        text="Recuperar contraseña"
        bold
        displayTitle
        styles={styles.title}
      />
      {step === 1 && (
        <View style={styles.firstContainer}>
          <Text
            text="Ingresa un correo electrónico asociado a tu cuenta y te enviaremos un código de verificación para que puedas recuperar tu contraseña."
            styles={styles.text}
            bold
            subtitle
          />
          <Text
            text="Ingresa tu correo electrónico"
            styles={{
              ...styles.text,
              marginBottom: 0,
            }}
            small
            bold
          />
          <Input
            placeholder="Tu correo electrónico"
            keyboardType="email-address"
            control={control}
            name="email"
            rules={{
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingresa un correo electrónico válido",
              },
            }}
            error={errors.email}
          />
          {error && <Text text={JSON.stringify(error)} error titleCase />}
          <Button
            buttonText="Enviar"
            action={handleSubmit(onSubmit)}
            filled
            buttonStyles={styles.button}
            loading={loading}
          />
        </View>
      )}
      {step === 2 && (
        <View style={styles.secondContainer}>
          <FontAwesomeIcon
            icon={faEnvelopeCircleCheck}
            size={100}
            color={COLORS.success}
          />
          <Text
            text="Se ha enviado un correo electrónico a tu cuenta, por favor revisa tu bandeja de entrada."
            subtitle
            bold
          />
          <Text
            text="Ingresa el código de verificación"
            small
            semiBold
            styles={{
              ...styles.text,
              marginBottom: -20,
              marginTop: 30,
            }}
          />
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <T
                key={index}
                style={[styles.cell, isFocused && styles.focusCell, symbol && styles.filledCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </T>
            )}
          />
          {error && <Text text={JSON.stringify(error)} error titleCase />}
          {/* <Text text="Reenviar código" small bold opaque /> */}
          <Button
            buttonText="Verificar"
            action={handleSubmit(onSubmitCode)}
            filled
            buttonStyles={styles.button}
          />
        </View>
      )}
      {step === 3 && (
        <View style={styles.thirdContainer}>
          <Text
            text="Ingresa tu nueva contraseña"
            small
            bold
            styles={{
              ...styles.text,
              marginBottom: 0,
            }}
          />
          <Input
            isPassword
            placeholder="Ingresa tu nueva contraseña"
            secureTextEntry
            control={control2}
            name="password"
            error={errors2.password}
          />
          <Input
            isPassword
            placeholder="Confirma tu nueva contraseña"
            secureTextEntry
            control={control2}
            name="confirmPassword"
            error={errors2.confirmPassword}
          />
          {error && <Text text={JSON.stringify(error)} error titleCase />}
          <Button
            buttonText="Cambiar contraseña"
            filled
            buttonStyles={styles.button}
            action={handleSubmit2(onSubmitNewPassword)}
          />
        </View>
      )}
      {step === 4 && (
        <View style={styles.fourthContainer}>
          <Icon name="check-circle" size={120} color={COLORS.success} />
          <Text text="Tu contraseña ha sido cambiada con éxito" />
          <Button
            buttonText="Iniciar sesión"
            filled
            buttonStyles={styles.button}
            action={() => navigation.navigate("Login")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  firstContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
  },
  text: {
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.danger,
  },
  secondContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  codeFieldRoot: {
    marginTop: 20,
    width: screenWidth - 40,
  },
  cell: {
    width: "20%",
    fontSize: 24,
    borderWidth: 2.5,
    borderColor: COLORS.dark,
    borderRadius: 20,
    textAlign: "center",
    paddingVertical: 16,
    marginVertical: 10,
    marginBottom: 20,
    fontFamily: "Lato-Bold",
  },
  focusCell: {
    borderColor: COLORS.frost3,
  },
  filledCell: {
    borderColor: COLORS.success,
  },
  thirdContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fourthContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForgotPasswordScreen;
