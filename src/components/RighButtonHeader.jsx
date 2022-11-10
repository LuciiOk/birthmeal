import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colorSchema";

const RighButtonHeader = ({ marginRight }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);

  // get current route name
  const currentRoute =
    navigation.getState().routes[navigation.getState().index].name;

  console.log(currentRoute);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight }}>
      {currentRoute !== "Profile" && (
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
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modal}></View>
            </TouchableWithoutFeedback>
            <View style={styles.topRight}>
              {/* content [mi perfil] */}
              <TouchableOpacity
                style={styles.content}
                onPress={() => {
                  navigation.navigate("Profile");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.text}>Mi perfil</Text>
              </TouchableOpacity>
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
    height: 50,
    width: 200,
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  text: {
    fontSize: 20,
    color: COLORS.dark,
  },
});

export default RighButtonHeader;
