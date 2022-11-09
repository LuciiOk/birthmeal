import React, { useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

import Text from "./Text";
import { getFormattedDate, getTimeLeft } from "../utils/formatDate";
import { COLORS } from "../constants/colorSchema";
import { BirthdayContext } from "../contexts/BirthdayContext";

import { cancelNotification } from "../hooks/useNotification";
import AddModal from "../containers/AddBirthday";

const BirthItem = ({ id, name, birthdate, notificationId = null }) => {
  const { deleteBirthday } = useContext(BirthdayContext);

  const [showModal, setShowModal] = React.useState(false);

  const onDelete = () => {
    deleteBirthday(id);
    if (notificationId) cancelNotification(notificationId);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={() => setShowModal(true)}>
      <View style={styles.itemLeft}>
        <Image
          source={require("../../assets/images/Burger-logo.png")}
          style={styles.image}
        />
        <View style={styles.itemText}>
          <Text text={name} subtitle bold cap />
          <Text
            text={getFormattedDate(birthdate)}
            semiBold
            styles={{
              fontSize: 12,
            }}
          />
          <Text text={getTimeLeft(birthdate)} opaque light />
        </View>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity
          onPress={() => onDelete()}
          style={styles.deleteButton}
        >
          <Icon name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <AddModal
        dataEdit={{ id, name, birthdate, notificationId }}
        onClose={() => setShowModal(false)}
        visible={showModal}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.white,
    height: 70,
    borderRadius: 15,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  itemText: {
    marginLeft: 10,
    width: "100%",
  },
  deleteButton: {
    padding: 10,
  },
});

BirthItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  notificationId: PropTypes.string,
};

export default BirthItem;
