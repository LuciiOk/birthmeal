import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import Input from "./Input";
import InputDate from "./InputDate";
import Button from "./Button";

export const AddModal = ({ onClose, visible }) => {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [switchValue, setSwitchValue] = React.useState(false);

  const onDismiss = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text text="Agregar nuevo cumpleaños" bold title />
            <TouchableOpacity onPress={onDismiss}>
              <Icon name="close" size={20} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Input placeholder="Nombre" keyboardType="default" />
            <InputDate placeholder="Fecha de nacimiento" />
            <View style={styles.switchContainer}>
              <Text text="Desea recibir notificaciones?" />
              <Switch
                trackColor={{ false: "#767577", true: COLORS.primary }}
                thumbColor={COLORS.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setSwitchValue(!switchValue)}
                value={switchValue}
              />
            </View>
            <Button buttonText="Agregar" action={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const AddButton = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleModal}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
      {modalVisible && (
        <AddModal visible={modalVisible} onClose={handleModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 0,
    margin: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  // modal
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: "90%",
    height: "50%",
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBody: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});

export default AddButton;
