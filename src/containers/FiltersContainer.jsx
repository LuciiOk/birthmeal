import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";

const FiltersContainer = ({ filters }) => {
  return (
    <View style={styles.header}>
      <Text text="Categorías" bold styles={styles.title} />
      <FlatList
        data={filters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FiltersCards filter={item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
      />
      <Text text="Establecimientos" bold styles={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 23,
  },
});

export default FiltersContainer;
