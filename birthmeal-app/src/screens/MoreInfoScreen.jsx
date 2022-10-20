import React, { useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Text from "../components/Text";
import Button from "../components/Button";
import useClipBoard from "../hooks/useClipBoard";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";

const MoreInfoScreen = () => {
  const { copyToClipBoard } = useClipBoard();
  const { user, token, logout } = useContext(AuthContext);

  const appDescription = `Birthmeal es una aplicación desarrollada
  por estudiantes de la Pontificia Universidad Católica de Valparaíso, con el objetivo facilitar
  la búsqueda de establecimientos que ofrezcan descuentos por encontrarse de cumpleaños.`;
  const developers = [
    {
      name: "Luciano Portales",
      email: "luciano.portales.j@mail.pucv.cl",
    },
    {
      name: "Ignacio Durán",
      email: "ignacio.duran.v@mail.pucv.cl",
    },
  ];

  const appVersion = "1.0.0";

  const appLogo = require("../../assets/images/logo.png");

  const closeSession = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={appLogo} style={styles.logo} />
        <Text text="Birthmeal" bold title styles={styles.title} />
        <Text
          text={`🤖 Versión ${appVersion} 🤖`}
          opaque
          styles={styles.version}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.headerDescription}>
          <Text
            text="Acerca de la aplicación"
            bold
            title
            styles={styles.titleBody}
          />
        </View>
        <Text text={appDescription} styles={styles.description} />
        <View style={styles.developers}>
          <Icon name="android" size={24} color={COLORS.frost1} />
          <Text
            text="Desarrolladores"
            bold
            title
            styles={styles.developersTitle}
          />
        </View>
        {developers.map((developer, index) => (
          <View key={index} style={styles.developer}>
            <Text text={developer.name} bold styles={styles.developerName} />
            <View style={styles.developerEmail}>
              <View style={styles.developerEmailIcon}>
                <Icon name="envelope" size={18} color={COLORS.frost1} />
                <Text
                  opaque
                  text={developer.email}
                  styles={styles.developerEmailText}
                />
              </View>
              <TouchableOpacity
                style={styles.developerEmailButton}
                onPress={() => copyToClipBoard(developer.email)}
              >
                <Icon name="copy" size={18} color={COLORS.frost3} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        {user && token && (
          <Button
            buttonText="Cerrar sesión"
            action={closeSession}
            filled
            styles={styles.button}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 1.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.dark,
    paddingVertical: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
  },
  version: {
    color: COLORS.white,
  },
  body: {
    flex: 2,
    padding: 20,
  },
  headerDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  titleBody: {
    marginLeft: 10,
    fontSize: 20,
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  developers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  developersTitle: {
    marginLeft: 10,
    fontSize: 20,
  },
  developer: {
    marginBottom: 10,
  },
  developerName: {
    marginBottom: 5,
    fontSize: 16,
  },
  developerEmail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  developerEmailIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  developerEmailText: {
    marginLeft: 5,
    fontSize: 16,
    textTransform: "lowercase",
  },
  developerEmailButton: {
    padding: 5,
  },
  footer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "70%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
});

export default MoreInfoScreen;
