import React, { useContext } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";
import { TABS } from "../constants/tabsScreens";
import { COLORS } from "../constants/colorSchema";
import { AuthContext } from "../contexts/AuthContext";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import RighButtonHeader from "../components/RighButtonHeader";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon }) => {
  const stylesT = [
    styles.tabIcon,
    focused ? styles.tabIconFocused : styles.tabIconUnfocused,
  ];

  return (
    <IonicIcon
      name={focused ? icon : icon + "-outline"}
      size={26}
      style={stylesT}
    />
  );
};

const TabNavigator = () => {
  const { user, token } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={TABS.HOME.name}
        component={TABS.HOME.component}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={TABS.HOME.icon} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Text text={TABS.HOME.title} displayTitle bold />
            </View>
          ),

          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerRight: () => (
            <RighButtonHeader marginRight={10}/>
          ),
        }}
      />
      {user && token && (
        <>
          <Tab.Screen
            name={TABS.FAVORITES.name}
            component={TABS.FAVORITES.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={TABS.FAVORITES.icon} />
              ),
              headerTitle: () => (
                <View style={styles.headerTitle}>
                  <Text text={TABS.FAVORITES.title} displayTitle bold />
                </View>
              ),
              headerTitleStyle: styles.headerTitle,
              headerStyle: styles.header,
              headerRight: () => (
                <RighButtonHeader marginRight={10}/>
              ),
            }}
          />
          <Tab.Screen
            name={TABS.BIRTH.name}
            component={TABS.BIRTH.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={TABS.BIRTH.icon} />
              ),
              headerTitle: () => (
                <View style={styles.headerTitle}>
                  <Text text={TABS.BIRTH.title} displayTitle bold />
                </View>
              ),
              headerTitleStyle: styles.headerTitle,
              headerStyle: styles.header,
              headerRight: () => (
                <RighButtonHeader marginRight={10}/>
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name={TABS.MORE_INFO.name}
        component={TABS.MORE_INFO.component}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={TABS.MORE_INFO.icon} />
          ),
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Text text={TABS.MORE_INFO.title} displayTitle bold />
            </View>
          ),
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerRight: () => (
            <RighButtonHeader marginRight={10}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 15,
    border: 0,
    height: 75,
    borderTopWidth: 0,
    shadowColor: "transparent",
  },
  tabIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 21,
    paddingVertical: 10,
    paddingHorizontal: 13,
    color: COLORS.white,
  },
  tabIconFocused: {
    backgroundColor: COLORS.primary,
  },
  tabIconUnfocused: {
    color: COLORS.dark,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    color: COLORS.dark,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Lato-Bold",
  },
  header: {
    backgroundColor: COLORS.white,
    height: 80,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    padding: 10,
  },
});

TabIcon.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.string,
};

export default TabNavigator;
