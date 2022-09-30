import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";

const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");

  const navigation = useNavigation();

  const action = () => {
    navigation.navigate("Login");
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    console.log(fDate);
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
              text="Creación de cuenta"
              bold
              title
              styles={styles.formHeaderText}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={name}
            onChangeText={handleEmail}
            keyboardType="default"
          />
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
          <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
        <TouchableOpacity onPress={action} style={styles.button}>
          <Text text="Crear cuenta" bold styles={{ color: COLORS.dark }} />
        </TouchableOpacity>
        <View style={{ marginTop: 5 }}>
          <Text
            text="¿Tienes una cuenta?"
            light
            styles={{ textAlign: "center" }}
          />
          <TouchableOpacity onPress={action}>
            <Text
              text="Inicia sesión"
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

export default RegisterScreen;
