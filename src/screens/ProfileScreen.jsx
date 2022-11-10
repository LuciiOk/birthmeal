import React, { useContext } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import Text from "../components/Text";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";
import moment from "moment/moment";
import { getTimeLeft } from "../utils/formatDate";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, token, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Home");
  };

  if (!token && !user && !user.user) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.white}
          hidden={false}
        />
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
      <Text text="Mi perfil" displayTitle bold />
      <View style={styles.profile}>
        <View style={{ flexDirection: "row" }}>
          <Text text="Nombre:" bold subtitle />
          <Text text={profile?.name} cap subtitle styles={{ marginLeft: 10 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text text="Email:" bold subtitle />
          <Text text={email} subtitle styles={{ marginLeft: 10 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text text="Tu cumpleaños:" bold subtitle />
          <Text
            text={moment(profile?.birthdate).format("DD/MM/YYYY")}
            cap
            subtitle
            styles={{ marginLeft: 10 }}
          />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text
            text={getTimeLeft(profile?.birthdate) + " para tu cumpleaños"}
          />
        </View>
      </View>
      <Button buttonText="Cerrar sesión" filled action={() => handleLogout()} />
      <Text text={JSON.stringify(profile, null, 2)} />
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
    textAlign: "center",
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
