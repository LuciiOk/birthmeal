import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import Input from "./Input";

const AddButton = () => {
  const navigation = useNavigation();

  const handleModal = () => {
    navigation.navigate("Add");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleModal}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export const AddModal = ({ handleModal }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text text="Agregar" title />
      </View>
      <View style={styles.modalContent}>
        <Input placeholder="Nombre" />
      </View>
      <View style={styles.modalFooter}>
        <TouchableOpacity onPress={handleModal}>
          <Text text="Cerrar" />
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddButton;
