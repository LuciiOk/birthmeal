import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";
import { TABS } from "../constants/tabsScreens";
import { COLORS } from "../constants/colorSchema";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon }) => {
  return (
    <IonicIcon
      name={focused ? icon : icon + "-outline"}
      size={28}
      color={focused ? COLORS.primary : COLORS.dark}
    />
  );
};

const TabNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    // add search bar to header
    navigation.setOptions({
      headerTitle: "Birthmeal",
      headerTitleStyle: {
        color: "red",
        fontSize: 24,
        fontFamily: "Lato-Bold",
        fontWeight: "1000",
      },
      headerRight: () => (
        <IonicIcon
          name="search"
          size={28}
          color={COLORS.primary}
          style={styles.searchIcon}
        />
      ),
    });
  }, [navigation, StatusBar]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      {TABS.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
            
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 15,
    border: 0,
    height: 75,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

TabIcon.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.string,
};

export default TabNavigator;
