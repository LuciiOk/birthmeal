import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  StatusBar,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS } from "../constants/colorSchema";
import Text from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import InputDate from "../components/InputDate";
import { BirthdaysContext } from "../contexts/BirthdaysContext";

const AddModal = ({ onClose, visible }) => {

  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [switchValue, setSwitchValue] = useState(false);

  const onDismiss = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
  };

  const onChangeDate = (selectedDate) => {
    setDate(selectedDate);
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
            <Input
              placeholder="Nombre"
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
            <InputDate
              placeholder="Fecha de nacimiento"
              date={date}
              changeDate={onChangeDate}
            />
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
            <Button buttonText="Agregar" action={handleSubmit} outlined />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: "90%",
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalBody: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});

export default AddModal;
