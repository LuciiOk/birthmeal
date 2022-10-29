import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import Text from "./Text";
import { COLORS } from "../constants/colorSchema";
import { getFormattedDate } from "../utils/formatDate";

const InputDate = ({ placeholder, date, changeDate }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    changeDate(currentDate);
  };


  return (
    <TouchableOpacity
      style={styles.input}
      onPress={() => {
        setShow(true);
      }}
    >
      <Text
        text={placeholder}
        bold
        opaque
        styles={{ color: COLORS.grayDark, fontSize: 16 }}
      />
      {date && <Text text={getFormattedDate(date)} bold opaque />}
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={onChangeDate}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

InputDate.propTypes = {
  placeholder: PropTypes.string,
  date: PropTypes.object,
  changeDate: PropTypes.func,
};

export default InputDate;
