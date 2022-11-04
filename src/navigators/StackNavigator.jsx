import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
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
import useOnboarding from "../hooks/useOnboarding";
import { AuthContext } from "../contexts/AuthContext";
import { COLORS } from "../constants/colorSchema";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user, token } = useContext(AuthContext);
  const navigation = useNavigation();

  const isFirstLaunch = useOnboarding();

  return (
    isFirstLaunch !== null && (
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Lato",
            fontSize: 30,
            color: COLORS.dark,
          },
          header: ({ route }) => (
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => {
                    if (route.name === "Onboarding") {
                      isFirstLaunch();
                    }
                    navigation.goBack();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    size={25}
                    color={COLORS.dark}
                  />
                </TouchableOpacity>
                <Text
                  displayTitle
                  cap
                  bold
                  text={route.params.name || route.name}
                />
              </View>
              <Image
                source={require("../../assets/images/Burger-logo.png")}
                style={styles.logo}
              />
            </View>
          ),
        }}
      >
        <Stack.Group screenOptions={{ headerShown: false }}>
          {!isFirstLaunch && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Home" component={TabNavigator} />
          {!user && !token && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Group>
        <Stack.Group screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Details" component={StablishmentDetail} />
          <Stack.Screen name="Locations" component={LocationsScreen} />
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
    height: 70,
    borderBottomColor: COLORS.light,
    marginRight: 10,
  },
  headerLeft: {
    flexDirection: "row",
  },
  headerTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 25,
    color: COLORS.dark,
    textTransform: "capitalize",
  },
  backButton: {
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});

export default StackNavigator;
