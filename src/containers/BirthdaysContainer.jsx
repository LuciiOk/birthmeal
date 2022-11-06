import React, { useContext } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import NoData from "../components/NoData";
import BirthItem from "../components/BirthItem";
import { BirthdayContext } from "../contexts/BirthdayContext";
import LoadingScreen from "../screens/LoadingScreen";

const BirthdaysContainer = () => {
  const { birthdays, loading } = useContext(BirthdayContext);

  if (loading && birthdays.length === 0)
    return <LoadingScreen backgroundColor="transparent" />;

  return (
    <View style={styles.body}>
      <FlatList
        data={birthdays}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <BirthItem
            {...item}
            key={item.id}
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
