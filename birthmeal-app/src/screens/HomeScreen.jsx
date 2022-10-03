import React, { useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import { STABLISHMENTS } from "../data/stablishments";
import StablishmentCard from "../components/StablishmentCard";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colorSchema";


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
});

export default HomeScreen;
