import React, { useEffect } from "react";
import { StyleSheet, FlatList, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { STABLISHMENTS } from "../data/stablishments";
import StablishmentCard from "../components/StablishmentCard";
import { COLORS } from "../constants/colorSchema";
import NoData from "../components/NoData";
import FiltersContainer from "../containers/FiltersContainer";

const HomeScreen = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLargeTitle: false,
  //     headerSearchBarOptions: {
  //       placeholder: "Search",
  //     },
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        data={STABLISHMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StablishmentCard stablishment={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NoData text="Ups... No hay establecimientos disponibles" />
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export default HomeScreen;
