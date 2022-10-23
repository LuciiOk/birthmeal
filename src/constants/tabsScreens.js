import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MoreInfoScreen from "../screens/MoreInfoScreen";
import BirthScreen from "../screens/BirthScreen";

export const TABS = {
  HOME: {
    name: "Overview",
    title: "Birthmeal",
    icon: "home",
    component: HomeScreen,
  },
  FAVORITES: {
    name: "Favorites",
    title: "Favoritos",
    icon: "heart",
    component: FavoritesScreen,
  },
  MORE_INFO: {
    name: "More Info",
    title: "Mas Información",
    icon: "information-circle",
    component: MoreInfoScreen,
  },
  BIRTH: {
    name: "Birth",
    title: "Cumpleaños",
    icon: "calendar",
    component: BirthScreen,
  },
};
