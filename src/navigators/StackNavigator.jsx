import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Text from "../components/Text";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import TabNavigator from "./Tabs";
import OnboardingScreen from "../screens/OnboardingScreen";
import StablishmentDetail from "../screens/StablishmentDetail";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LocationsScreen from "../screens/LocationsScreen";
import { AuthContext } from "../contexts/AuthContext";
import { COLORS } from "../constants/colorSchema";
import { useNavigation } from "@react-navigation/native";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RighButtonHeader from "../components/RighButtonHeader";
import { OnboardingContext } from "../contexts/OnboardingProvider";
import { NetworkContext } from "../contexts/NetworkProvider";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, token } = useContext(AuthContext);
  const { isFirstLaunch } = useContext(OnboardingContext);
  const navigation = useNavigation();
  const { networkState } = useContext(NetworkContext);

  return (
    isFirstLaunch !== null && (
      <Stack.Navigator
        screenOptions={{
          header: ({ route }) => (
            <View style={{ flexDirection: "column" }}>
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                      if (route.name === "Onboarding") {
                        isFirstLaunch();
                      }

                      if (!navigation.canGoBack()) {
                        navigation.navigate("Home");
                        return;
                      }
                      navigation.goBack();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size={20}
                      color={COLORS.dark}
                    />
                  </TouchableOpacity>
                  <Text
                    title
                    cap
                    bold
                    text={
                      route?.params?.name ||
                      (route.name === "Locations"
                        ? "Ubicaciones"
                        : route.name === "Login"
                        ? "Iniciar sesión"
                        : route.name === "Register"
                        ? "Registrarse"
                        : route.name === "ForgotPassword"
                        ? "Recuperar contraseña"
                        : route.name === "Profile"
                        ? "Perfil"
                        : route.name)
                    }
                  />
                </View>
                <RighButtonHeader route={route} />
              </View>
              {!networkState.isConnected && (
                <View style={styles.offlineContainer}>
                  <Text
                    text="No tienes conexión a internet"
                    color={COLORS.white}
                    small
                    semiBold
                  />
                </View>
              )}
            </View>
          ),
        }}
      >
        <Stack.Group screenOptions={{ headerShown: false }}>
          {isFirstLaunch && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          {!user && !token && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
            </>
          )}
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Details" component={StablishmentDetail} />
          <Stack.Screen name="Locations" component={LocationsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Group>
      </Stack.Navigator>
    )
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    height: 65,
    borderBottomColor: COLORS.light,
    marginRight: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitle: {
    fontFamily: "Lato-Bold",
    color: COLORS.dark,
    textTransform: "capitalize",
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  offlineContainer: {
    backgroundColor: COLORS.danger,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default StackNavigator;
