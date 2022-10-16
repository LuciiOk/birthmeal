import React, { useEffect } from "react";
import { StyleSheet, FlatList, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { STABLISHMENTS } from "../data/stablishments";
import StablishmentCard from "../components/StablishmentCard";
import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";
import { FILTERS } from "../data/filters";
import { COLORS } from "../constants/colorSchema";

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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white}/>
      <View style={styles.header}>
        <Text text="Bienvenido a " title />
        <Text text="Birthmeal" title bold />
      </View>
      <Text text="Lugares" title bold />
      <View>
        <FlatList
          data={FILTERS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FiltersCards filter={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={STABLISHMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StablishmentCard stablishment={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default HomeScreen;
