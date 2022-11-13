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

const { width: screenWidth } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
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
    reset,
    register,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async ({ email }) => {
    const response = await AxiosInstance.post("/auth/forgot-password", {
      email,
    });
    if (response.status === 200) {
      setStep(2);
    }
  };

  const onSubmitCode = async (data) => {
    const response = await AxiosInstance.post("/auth/verify", {
      code,
      email: data.email,
    });
    if (response.status === 200) {
      setStep(3);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 && (
        <View style={styles.firstContainer}>
          <Text text="Recuperar contraseña" bold title styles={styles.title} />
          <Input
            placeholder="Tu correo electrónico"
            keyboardType="email-address"
            control={control}
            name="email"
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
          />
          {errors.email && <Text text={errors.email.message} error />}
          <Button
            buttonText="Enviar"
            action={handleSubmit(onSubmit)}
            outlined
            buttonStyles={styles.button}
          />
        </View>
      )}
      {step === 2 && (
        <View style={styles.secondContainer}>
          <Icon name="check-circle" size={100} color={COLORS.success} />
          <Text text="Recuperar contraseña" bold title />
          <Text text="Se ha enviado un correo electrónico a tu cuenta" />
          <Text text="Ingresa el código de verificación" />
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
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </T>
            )}
          />
          <Text text="Reenviar código" small bold opaque />
          <Button buttonText="Verificar" action={handleSubmit(onSubmitCode)} />
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
  button: {
    marginTop: 20,
  },
  secondContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  codeFieldRoot: {
    marginTop: 20,
    width: screenWidth - 40,
  },
  cell: {
    width: "20%",
    fontSize: 24,
    borderWidth: 2,
    borderColor: COLORS.info,
    borderRadius: 5,
    textAlign: "center",
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
  focusCell: {
    borderColor: COLORS.danger,
  },
});

export default ForgotPasswordScreen;
