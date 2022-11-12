import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Text from "../components/Text";
import { COLORS } from "../constants/colorSchema";
import useClipBoard from "../hooks/useClipBoard";

const { width, height } = Dimensions.get("window");

const MoreInfoScreen = () => {
  const { copyToClipBoard } = useClipBoard();

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

  const appVersion = "2.0.2";

  const appLogo = require("../../assets/images/Burger-logo.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={appLogo} style={styles.logo} />
        <Text text="Birthmeal" bold title styles={styles.title} />
        <Text text={`🤖 Versión ${appVersion} 🤖`} small opaque />
      </View>
      <View style={styles.body}>
        <View style={styles.description}>
          <Text
            text="Acerca de la aplicación"
            bold
            title
            styles={styles.titleBody}
          />
          <Text text={appDescription} small justify />
        </View>
        <View style={styles.developers}>
          <Icon name="android" size={24} color={COLORS.grayDark}/>
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
                <Icon name="envelope" size={16} color={COLORS.dark} />
                <Text
                  opaque
                  small
                  text={developer.email}
                  styles={styles.developerEmailText}
                />
              </View>
              <TouchableOpacity
                style={styles.developerEmailButton}
                onPress={() => copyToClipBoard(developer.email)}
              >
                <Icon name="copy" size={18} color={COLORS.grayDark}/>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text text="* Aviso:" bold subtitle />
        <Text
          text=" No somos responsables de los descuentos ofrecidos por los establecimientos."
          opaque
          small
          semiBold
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height,
    backgroundColor: "#fff",
    width: width,
    paddingHorizontal: 25,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    marginTop: 10,
  },
  version: {
    marginTop: 10,
  },
  body: {
    marginTop: 20,
  },
  headerDescription: {
    marginBottom: 20,
  },
  titleBody: {
    marginBottom: 10,
  },
  description: {},
  developers: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  developersTitle: {
    marginLeft: 10,
  },
  developer: {
    marginBottom: 10,
  },
  developerName: {
    marginBottom: 5,
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
  },
  developerEmailButton: {
    marginLeft: 10,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    marginTop: 5,
  },
});

export default MoreInfoScreen;
