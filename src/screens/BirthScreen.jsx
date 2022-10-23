import React, {
  useEffect,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";

import Text from "../components/Text";
import AddButton from "../components/AddButton";

import BirthdaysContainer from "../containers/BirthdaysContainer";
import AxiosInstance from "../utils/AxiosInstance";

const BirthScreen = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBirthday = async () => {
    try {
      const response = await AxiosInstance.get("/birthdays/profile");
      setBirthdays(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBirthday();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text="Cumpleaños" bold title />
      </View>
      <BirthdaysContainer birthdays={birthdays} loading={loading} error={error}/>
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
