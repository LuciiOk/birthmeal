import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";
import * as Linking from "expo-linking";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation()

  const action = () => {
    navigation.navigate("Home", {
      screen: "Overview",
    });
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        colors={["#f6d365", "#fda085"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 1]}
      >
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <Text
              text="Welcome back!"
              bold
              title
              styles={styles.formHeaderText}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={handlePassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={action} style={styles.button}>
          <Text text="Iniciar sesión" bold styles={{ color: COLORS.dark }} />
        </TouchableOpacity>
        <View style={{marginTop: 5}}>
          <Text
            text="¿No tienes cuenta?"
            light
            styles={{ textAlign: "center" }}
          />
          <TouchableOpacity onPress={goToRegister}>
            <Text
              text="Regístrate"
              bold
              styles={{ textAlign: "center", color: COLORS.dark }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2.5,
    borderColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
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
