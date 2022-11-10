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

  const [query, setQuery] = React.useState(null);

  const onQuery = async (category) => {
    let categories = query?.categories ?? [];
    if (category === "Limpar") {
      setQuery(null);
      await fetchData();
      return;
    }
    if (categories.includes(category)) {
      const index = categories.indexOf(category);
      categories.splice(index, 1);
      if (categories.length === 0) {
        setQuery(null);
      } else {
        setQuery({ ...query, categories });
      }
      await fetchData({ categories });
      setQuery({ categories });
      return;
    }
    categories = [...categories, category];
    await fetchData({ categories });
    setQuery({ categories });
  };

  const { data: categories, fetchData: fetchCategories } = useRequestHttp(
    "categories/companies",
    "get"
  );

  const onRefresh = () => {
    fetchData();
    fetchCategories();
    setQuery(null);
  };

  if (loading && stablishments.length === 0)
    return <LoadingScreen backgroundColor="transparent" />;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        hidden={false}
      />
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
        ListHeaderComponent={
          <FiltersContainer
            filters={categories}
            setQuery={onQuery}
            categoriesSelected={query?.categories ?? []}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  header: {
    marginTop: 20,
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
