import React from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import NoData from "../components/NoData";
import StablishmentCard from "../components/StablishmentCard";
import { COLORS } from "../constants/colorSchema";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import error from "./../../assets/images/Burger-Sleeping.png";

const FavoritesScreen = () => {
  const { favorites, loading, getFavorites } =
    React.useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      <View style={styles.favoritesList}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getFavorites} />
          }
          data={favorites}
          keyExtractor={({ id }) => id + "favorites"}
          renderItem={({ item }) => (
            <StablishmentCard stablishment={item} favortie />
          )}
          ListEmptyComponent={
            <NoData
              text="Ups... No hay establecimientos favoritos 😢💔"
              image={error}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  favoritesList: {
    flex: 10,
    width: "100%",
  },
});

export default FavoritesScreen;
