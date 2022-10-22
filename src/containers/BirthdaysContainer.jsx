import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Text from "../components/Text";
import NoData from "../components/NoData";
import BirthItem from "../components/BirthItem";
import { BirthdaysContext } from "../contexts/BirthdaysContext";

const BirthdaysContainer = () => {
  const { birthdays, loading, error } = useContext(BirthdaysContext);

  const onDelete = (id) => {
    console.log("Deleted", id);
  };

  return (
    <View style={styles.body}>
      {loading ? (
        <Text text="Cargando..." />
      ) : error ? (
        <Text text="Error" />
      ) : !loading && !error ? (
        <FlatList
          data={birthdays || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BirthItem
              name={item.name}
              date={item.date}
              id={item.id}
              onDelete={onDelete}
            />
          )}
          ListEmptyComponent={
            <NoData text="Ups... Parece que no hay nada por aquí, agrega un nuevo cumpleaños! 🥳" />
          }
          ListHeaderComponent={<View style={{ height: 20 }} />}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      ) : null}
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
