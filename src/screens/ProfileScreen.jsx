import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import Text from "../components/Text";
import Button from "../components/Button";
import { COLORS } from "../constants/colorSchema";
import moment from "moment/moment";
import { getTimeLeft } from "../utils/formatDate";
import { burger } from "../data/burger";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const [developer, setDeveloper] = React.useState(0);

  const handleLogout = async () => {
    navigation.navigate("Home");
    await logout();
  };

  const { user: profile, email } = user;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {developer >= 11 && (
        <Text
          style={styles.dev}
          text={burger}
          styles={{
            fontSize: 12,
            marginBottom: 10,
            textAlign: "center",
            color: COLORS.danger,
          }}
        ></Text>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          setDeveloper(developer + 1);
          if (developer === 10) {
            ToastAndroid.show("¡Easter egg encontrado!", ToastAndroid.SHORT);
          }
          if (developer >= 20) {
            ToastAndroid.show("¡Easter egg encontrado!", ToastAndroid.SHORT);
            setDeveloper(0);
          }
        }}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Burger-logo.png")}
            style={styles.image}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text text="Mi perfil" displayTitle bold />
      <View style={styles.profile}>
        <View style={{ flexDirection: "row" }}>
          <Text text="Nombre:" bold subtitle />
          <Text text={profile?.name} cap subtitle styles={{ marginLeft: 10 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text text="Email:" bold subtitle />
          <Text text={email} subtitle styles={{ marginLeft: 10 }} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text text="Tu cumpleaños:" bold subtitle />
          <Text
            text={moment(profile?.birthdate).format("DD/MM/YYYY")}
            cap
            subtitle
            styles={{ marginLeft: 10 }}
          />
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text
            text={getTimeLeft(profile?.birthdate) + " para tu cumpleaños"}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          buttonText="Cerrar sesión"
          filled
          action={() => handleLogout()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  profile: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  developer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  dev: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  buttons: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
