import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MoreInfoScreen from "../screens/MoreInfoScreen";
import BirthScreen from "../screens/BirthScreen";
import { faHome, faBirthdayCake, faInfoCircle, faHeart } from "@fortawesome/free-solid-svg-icons";

export const TABS = {
  HOME: {
    name: "Overview",
    title: "Birthmeal",
    icon: faHome,
    component: HomeScreen,
  },
  FAVORITES: {
    name: "Favorites",
    title: "Favoritos",
    icon: faHeart,
    component: FavoritesScreen,
  },
  MORE_INFO: {
    name: "More Info",
    title: "Información",
    icon: faInfoCircle,
    component: MoreInfoScreen,
  },
  BIRTH: {
    name: "Birth",
    title: "Cumpleaños",
    icon: faBirthdayCake,
    component: BirthScreen,
  },
};
