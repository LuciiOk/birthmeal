import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import NoData from "../components/NoData";
import StablishmentCard from "../components/StablishmentCard";
import useRequestHttp from "../hooks/useRequestHttp";
import AxiosInstance from "../utils/AxiosInstance";
import LoadingScreen from "./LoadingScreen";

const FavoritesScreen = () => {
  const {
    data: favorites,
    loading,
    fetchData,
  } = useRequestHttp("user/favorite", "get");

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && favorites.length === 0)
    return <LoadingScreen backgroundColor="transparent" />;

  return (
    <View style={styles.container}>
      <View style={styles.favoritesList}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          data={favorites.data}
          keyExtractor={({ id }) => id + "favorites"}
          renderItem={({ item }) => <StablishmentCard stablishment={item} />}
          ListEmptyComponent={
            <NoData text="Ups... No hay establecimientos favoritos 😢💔" />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  favoritesList: {
    flex: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default FavoritesScreen;
