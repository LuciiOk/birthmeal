import React, { useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView, StatusBar, View } from "react-native";
import { STABLISHMENTS } from "../data/stablishments";
import StablishmentCard from "../components/StablishmentCard";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ 
      headerLargeTitle: false,
      headerSearchBarOptions: {
        placeholder: "Search",
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text text="Hola, " bold title styles={styles.textHeader}/>
          <Text text="Luciano" title styles={styles.textHeader}/>
        </View>
        <Text text="Encuentra los mejores restaurantes para celebrar tu cumpleaños" opaque />
      </View>
      <Text text="Lugares" title bold />
      <FlatList
        data={STABLISHMENTS}
        renderItem={({ item }) => <StablishmentCard stablishment={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 24,
  },
});

export default HomeScreen;
