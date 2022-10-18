import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import COLORS from "../constants/colorSchema";
import Text from "./Text";

const BirthItem = ({ name, date, onDelete }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.image}
        />
        <View style={styles.itemText}>
          <Text text={name} bold />
          <Text text={date} opaque light />
        </View>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  itemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 20,
  },
  itemRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    marginHorizontal: 10,
    marginVertical: 2,
  },
});

BirthItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BirthItem;