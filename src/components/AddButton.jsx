import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS } from "../constants/colorSchema";
import AddBirthday from "../containers/AddBirthday";

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
        <AddBirthday visible={modalVisible} onClose={handleModal} />
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
});

export default AddButton;
