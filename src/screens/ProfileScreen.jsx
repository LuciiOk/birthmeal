import React, { useContext } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import Text from "../components/Text";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, token, isLogged, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Home");
  };

  if (!token && !user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text displayTitle bold text="Perfil" />
          <Text text="Inicia sesión para ver tu perfil" bold subtitle />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonText="Volver al inicio"
            filled
            action={() => navigation.navigate("Home")}
          />
          <Button
            buttonText="Iniciar sesión"
            outlined
            action={() => navigation.navigate("Login")}
            buttonStyles={{ marginTop: 10 }}
          />
        </View>
      </View>
    );
  }

  const { user: profile, email } = user;

  return (
    <View style={styles.container}>
      <Text text="Perfil" displayTitle bold />
      <View style={styles.profile}>
        <View style={{ flexDirection: "row" }}>
          <Text text="Nombre:" bold subtitle />
          <Text text={profile?.name} cap subtitle styles={{ marginLeft: 10 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text text="Email:" bold subtitle />
          <Text text={email} cap subtitle styles={{ marginLeft: 10 }} />
        </View>
      </View>
      <Button buttonText="Cerrar sesión" filled action={() => handleLogout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  profile: {
    width: "80%",
    marginVertical: 20,
    flex: 0.7,
  },
  header: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0.3,
    width: "80%",
    flexDirection: "column",
    marginVertical: 20,
    alignItems: "center",
  },
});

export default ProfileScreen;