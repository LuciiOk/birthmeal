import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

import Text from "../components/Text";

// textos en español
const ConfirmModal = ({ show, onAccept, setShow, message }) => {
  const onDecline = () => {
    setShow(false);
  };

  return (
    <Modal
      visible={show}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
        <View style={styles.card}>
          <Text styles={styles.text} text={message} titleCase bold />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onDecline}>
              <Text styles={styles.buttonCancel} text="Cancelar" small bold />
            </TouchableOpacity>
            <TouchableOpacity onPress={onAccept}>
              <Text styles={styles.buttonAccept} text="Aceptar" small bold />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  text: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonAccept: {
    color: "white",
    backgroundColor: COLORS.success,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonCancel: {
    color: "white",
    backgroundColor: COLORS.danger,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onAccept: PropTypes.func,
  setShow: PropTypes.func,
  message: PropTypes.string,
};

export default ConfirmModal;
