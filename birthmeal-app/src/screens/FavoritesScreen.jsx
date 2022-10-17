import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import NoData from "../components/NoData";
import StablishmentCard from "../components/StablishmentCard";

import useFetchData from "../hooks/useFetchData";

const FavoritesScreen = () => {

  const [data, setData] = React.useState([]);
  const { _data, error, loading } = useFetchData("favorites");

  React.useEffect(() => {
    setData(_data ?? []);
  }, [_data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text="Favoritos" title bold />
      </View>
      <View style={styles.favoritesList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StablishmentCard stablishment={item} />}
          ListEmptyComponent={<NoData text="Ups... No hay establecimientos favoritos 😢💔" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  favoritesList: {
    flex: 10,
  },
});

export default FavoritesScreen;
