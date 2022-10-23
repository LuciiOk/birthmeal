import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import NoData from "../components/NoData";
import BirthItem from "../components/BirthItem";

const BirthdaysContainer = ({ birthdays }) => {
  const onDelete = (id) => {
    console.log("Deleted", id);
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={birthdays || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BirthItem
            name={item.name}
            date={item.birthdate}
            id={item.id}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={
          <NoData text="Ups... Parece que no hay nada por aquí, agrega un nuevo cumpleaños! 🥳" />
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 10,
    width: "100%",
  },
});

export default BirthdaysContainer;
