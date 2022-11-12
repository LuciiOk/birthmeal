import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Modal, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";

const LoginMessage = ({ visible, onClose }) => {
  const navigate = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" animated={true} />
        <View style={styles.modal}>
          <View style={styles.header}>
            <Icon
              name="exclamation-triangle"
              size={30}
              color={COLORS.warning}
            />
            <Text styles={styles.title} text="¡Atención!" bold />
          </View>
          <Text
            styles={styles.message}
            text="Debes iniciar sesión para poder realizar esta acción"
            bold
            small
          />
          <View style={styles.buttons}>
            <Icon.Button
              style={styles.button}
              name="close"
              backgroundColor={COLORS.danger}
              onPress={onClose}
              borderRadius={15}
            >
              <Text styles={styles.buttonText} text="Cancelar" small bold />
            </Icon.Button>
            <View style={styles.separator} />
            <Icon.Button
              style={styles.button}
              name="check"
              backgroundColor={COLORS.success}
              onPress={() => {
                onClose();
                navigate.navigate("Login");
              }}
              borderRadius={15}
            >
              <Text
                styles={styles.buttonText}
                text="Iniciar sesión"
                small
                bold
              />
            </Icon.Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  message: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: "45%",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
  },
  separator: {
    width: 10,
  },
});

export default LoginMessage;
