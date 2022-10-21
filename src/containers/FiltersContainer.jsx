import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";
import { FILTERS } from "../data/filters";

const FiltersContainer = ({ filters }) => {
  return (
    <View style={styles.header}>
      <Text text="Categorías" title bold />
      <FlatList
        data={FILTERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FiltersCards filter={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Text text="Establecimientos" title bold />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
  },
});

export default FiltersContainer;
