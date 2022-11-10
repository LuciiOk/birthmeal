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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);
  const [developer, setDeveloper] = React.useState(0);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Home");
  };

  const { user: profile, email } = user;

  return (
    <View style={styles.container}>
      {developer >= 10 && <Text text={JSON.stringify(profile, null, 2)} />}
      <TouchableWithoutFeedback
        onPress={() => {
          setDeveloper(developer + 1);
          if (developer >= 10) {
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
      <Button buttonText="Cerrar sesión" filled action={() => handleLogout()} />
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
});

export default ProfileScreen;
