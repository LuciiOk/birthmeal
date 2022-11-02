import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  View,
  RefreshControl,
} from "react-native";

import StablishmentCard from "../components/StablishmentCard";
import { COLORS } from "../constants/colorSchema";
import NoData from "../components/NoData";
import LoadingScreen from "./LoadingScreen";
import useRequestHttp from "../hooks/useRequestHttp";
import FiltersContainer from "../containers/FiltersContainer";

const HomeScreen = () => {
  const {
    data: stablishments,
    loading,
    fetchData,
  } = useRequestHttp("companies", "get");

  const {
    data: categories,
    loading: loadingCategories,
    fetchData: fetchCategories,
  } = useRequestHttp("categories/companies", "get");

  const onRefresh = () => {
    fetchData();
    fetchCategories();
  };

  if (loading && stablishments.length === 0)
    return <LoadingScreen backgroundColor="transparent" />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={stablishments}
        keyExtractor={(item) => item.id + "stablishments"}
        renderItem={({ item }) => <StablishmentCard stablishment={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <NoData text="Ups... No hay establecimientos disponibles" />
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListHeaderComponent={<FiltersContainer filters={categories} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
  },
  primary: {
    color: COLORS.primary,
    fontSize: 30,
  },
  frost: {
    color: COLORS.frost1,
    fontSize: 25,
  },
  normal: {
    color: COLORS.warning,
    fontSize: 19,
  },
});

export default HomeScreen;
