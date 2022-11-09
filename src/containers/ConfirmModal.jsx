import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

// textos en español
const ConfirmModal = ({ show, onAccept, setShow, message }) => {
  const onDecline = () => {
    setShow(false);
  };

  return (
    <Modal
      visible={show}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onAccept}>
              <Text style={styles.buttonAccept}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDecline}>
              <Text style={styles.buttonCancel}>Cancelar</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "80%",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonAccept: {
    color: "white",
    fontSize: 18,
    backgroundColor: COLORS.success,
    padding: 10,
    borderRadius: 5,
  },
  buttonCancel: {
    color: "white",
    fontSize: 18,
    backgroundColor: COLORS.danger,
    padding: 10,
    borderRadius: 5,
  },
});

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onAccept: PropTypes.func,
  setShow: PropTypes.func,
  message: PropTypes.string,
};

export default ConfirmModal;
