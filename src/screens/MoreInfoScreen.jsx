import React, { useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Text from "../components/Text";
import Button from "../components/Button";
import useClipBoard from "../hooks/useClipBoard";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const MoreInfoScreen = () => {
  const { copyToClipBoard } = useClipBoard();
  const navigation = useNavigation();
  const { user, token, logout } = useContext(AuthContext);

  const appDescription = `Birthmeal es una aplicación desarrollada por estudiantes de la Pontificia Universidad Católica de Valparaíso, con el objetivo facilitar la búsqueda de establecimientos que ofrezcan descuentos por encontrarse de cumpleaños.`;
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

  const appLogo = require("../../assets/images/Burger-logo.png");

  const closeSession = () => {
    logout();
  };

  const login = () => {
    navigation.navigate("Login");
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
          <Text text={appDescription} styles={styles.description} />
        </View>
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
        <Text text="* Disclaimer:" bold />
        <Text
          text=" No somos responsables de los descuentos ofrecidos por los establecimientos."
          styles={styles.footerText}
        />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: COLORS.frost1,
    fontSize: 24,
    marginTop: 10,
  },
  version: {
    color: COLORS.frost1,
    fontSize: 12,
    marginTop: 10,
  },
  body: {
    flex: 2,
    padding: 20,
  },
  headerDescription: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: -15,
  },
  titleBody: {
    fontSize: 18,
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "justify",
  },
  developers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  developersTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  developer: {
    marginBottom: 10,
  },
  developerName: {
    fontSize: 16,
  },
  developerEmail: {
    flexDirection: "row",
    alignItems: "center",
  },
  developerEmailIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  developerEmailText: {
    fontSize: 14,
    marginLeft: 5,
  },
  developerEmailButton: {
    borderRadius: 50,
    padding: 5,
  },
  footer: {
    flex: 1,
    padding: 20,
  },
  footerText: {
    color: COLORS.grayDark,
    fontSize: 14,
  },
});

export default MoreInfoScreen;
