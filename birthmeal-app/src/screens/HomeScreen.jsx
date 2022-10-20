import React, { useEffect } from "react";
import { StyleSheet, FlatList, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { STABLISHMENTS } from "../data/stablishments";
import StablishmentCard from "../components/StablishmentCard";
import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";
import { FILTERS } from "../data/filters";
import { COLORS } from "../constants/colorSchema";
import NoData from "../components/NoData";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: false,
      headerSearchBarOptions: {
        placeholder: "Search",
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <Text text="Categorías" title bold />
        {/* <FlatList
          data={FILTERS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FiltersCards filter={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        /> */}
        <Text text="Establecimientos" title bold />
      </View>

      <FlatList
        data={STABLISHMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StablishmentCard stablishment={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NoData text="Ups... No hay establecimientos disponibles" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    marginVertical: 10,
  },
});

export default HomeScreen;
