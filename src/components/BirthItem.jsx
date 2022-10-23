import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import Text from "./Text";
import { getFormattedDate } from "../utils/formatDate";

const BirthItem = ({ id, name, date }) => {

  const onDelete = (id) => {
    removeBirthday(id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Image
          source={require("../../assets/images/Burger-logo.png")}
          style={styles.image}
        />
        <View style={styles.itemText}>
          <Text text={name} bold />
          <Text text={getFormattedDate(date)} opaque light />
        </View>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={styles.deleteButton}
        >
          <Icon name="close" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  itemLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  itemText: {
    marginLeft: 10,
  },
  deleteButton: {
    padding: 10,
  },
});

BirthItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BirthItem;
