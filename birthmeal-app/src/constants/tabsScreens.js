import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MoreInfoScreen from "../screens/MoreInfoScreen";
import BirthScreen from "../screens/BirthScreen";

export const TABS = [
  {
    name: "Overview",
    title: "Birthmeal",
    icon: "home",
    component: HomeScreen,
  },
  {
    name: "Favorites",
    title: "Favorites",
    icon: "heart",
    component: FavoritesScreen,
  },
  {
    name: "Birthdays",
    title: "Birthdays",
    icon: "calendar",
    component: BirthScreen,
  },
  {
    name: "Information",
    title: "Information",
    icon: "information-circle",
    component: MoreInfoScreen,
  },
];
