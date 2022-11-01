import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";

const FiltersContainer = ({ filters }) => {
  return (
    <View style={styles.header}>
      <Text text="Categorías" title bold />
      <FlatList
        data={filters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FiltersCards filter={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
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
