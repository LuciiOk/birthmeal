import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PropTypes from "prop-types";

import Text from "../components/Text";
import FiltersCards from "../components/FiltersCards";

const FiltersContainer = ({ filters, setQuery, categoriesSelected }) => {
  return (
    <View style={styles.header}>
      <Text
        styles={{
          width: "80%",
        }}
        displayTitle
        text="Encuentra tu establecimiento"
        bold
      />
      <FlatList
        data={filters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FiltersCards
            filter={item}
            setQuery={setQuery}
            isSelected={categoriesSelected.includes(item.name)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <FiltersCards
            filter={{ name: "Limpiar", id: "reset", icon: "faRedo" }}
            setQuery={setQuery}
          />
        }
        horizontal
        style={styles.list}
      />
      <Text text="Establecimientos" bold title />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 10,
  },
});

FiltersContainer.propTypes = {
  filters: PropTypes.array,
  setQuery: PropTypes.func,
  categoriesSelected: PropTypes.array,
};

export default FiltersContainer;
