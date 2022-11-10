import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS } from "../constants/colorSchema";

const LoginMessage = ({ visible, onClose }) => {
  const navigate = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Icon name="exclamation-triangle" size={30} color={COLORS.danger} />
            <Text style={styles.title}>¡Ups!</Text>
          </View>
          <Text style={styles.message}>
            Debes iniciar sesión para poder realizar esta acción.
          </Text>
          <View style={styles.buttons}>
            <Icon.Button
              style={styles.button}
              name="close"
              backgroundColor={COLORS.danger}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
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
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
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
    borderRadius: 5,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
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
    borderRadius: 5,
    minWidth: "45%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  separator: {
    width: 10,
  },
});

export default LoginMessage;
