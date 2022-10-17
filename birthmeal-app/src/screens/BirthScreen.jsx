import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import AddButton from "../components/AddButton";

import useFetchData from "../hooks/useFetchData";
import NoData from "../components/NoData";
import BirthItem from "../components/BirthItem";

const BirthScreen = () => {
  const data = [
  ];
  const { _data, error, loading } = useFetchData("posts");

  const onDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text="Cumpleaños" bold title />
      </View>
      <View style={styles.body}>
        {loading ? (
          <Text text="Cargando..." />
        ) : error ? (
          <Text text="Error" />
        ) : data ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BirthItem
                name={item.name}
                date={item.date}
                onDelete={onDelete}
              />
            )}
            ListEmptyComponent={
              <NoData text="Ups... Parece que no hay nada por aquí, agrega un nuevo cumpleaños! 🥳" />
            }
          />
        ) : null}
      </View>
      <AddButton />
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
  body: {
    flex: 10,
    width: "100%",
  },
});

export default BirthScreen;
