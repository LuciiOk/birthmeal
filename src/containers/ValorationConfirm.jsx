import React from "react";
import Icons from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants/colorSchema";

const ValorationConfirm = ({
  visible,
  setVisible,
  onConfirm,
  starsSelected,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < starsSelected) {
        stars.push(<Icons key={i} name="star" size={26} color="#FFD700" />);
      } else {
        stars.push(<Icons key={i} name="star-o" size={26} color="#FFD700" />);
      }
    }
    return stars;
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>¿Estás seguro?</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>
              Estás a punto de valorar con {starsSelected} estrellas
            </Text>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <Text style={styles.text}>¿Quieres confirmar la valoración?</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonConfirm}
              onPress={() => {
                setVisible(false);
                onConfirm();
              }}
            >
              <Text style={styles.textButton}>Confirmar</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  body: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonCancel: {
    backgroundColor: COLORS.danger,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonConfirm: {
    backgroundColor: COLORS.success,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  textButton: {
    color: COLORS.white,
    fontSize: 16,
  },
});

ValorationConfirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  starsSelected: PropTypes.number.isRequired,
};

export default ValorationConfirm;
