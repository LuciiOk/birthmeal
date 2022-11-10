import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import { AuthContext } from "../contexts/AuthContext";

const RighButtonHeader = ({ marginRight }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { token, user, logout } = React.useContext(AuthContext);

  // get current route name
  const currentRoute =
    navigation.getState().routes[navigation.getState().index].name;

  const handleLogout = () => {
    logout();
    setModalVisible(false);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
    setModalVisible(false);
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight }}>
      {currentRoute !== "Profile" && currentRoute !== "Login" && currentRoute !== "Register" && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon
            icon={faAngleDown}
            size={30}
            color={COLORS.dark}
            style={styles.icon}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modal}></View>
            </TouchableWithoutFeedback>
            <View style={styles.topRight}>
              {token && user && (
                <OptionButton label="Mi perfil" onPress={handleProfile} />
              )}
              {token && user && (
                <OptionButton label="Cerrar sesión" onPress={handleLogout} />
              )}
              {!token && !user && (
                <OptionButton label="Iniciar sesión" onPress={handleLogin} />
              )}
            </View>
          </Modal>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          source={require("../../assets/images/Burger-logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
};

const OptionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.content} onPress={onPress}>
    <Text style={styles.text} semiBold subtitle text={label} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: COLORS.dark,
  },
  icon: {
    marginRight: 10,
    borderRadius: 50,
    borderColor: COLORS.dark,
    padding: 5,
  },
  modal: {
    flex: 1,
  },
  topRight: {
    backgroundColor: COLORS.white,
    width: 150,
    position: "absolute",
    top: 50,
    right: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  content: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: COLORS.dark,
  },
});

export default RighButtonHeader;
