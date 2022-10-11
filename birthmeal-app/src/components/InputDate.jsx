import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import Text from "./Text";
import { COLORS } from "../constants/colorSchema";


const InputDate = ({ placeholder }) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate); 
  };

  const getFormattedDate = () => {
    let tempDate = new Date(date);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    return fDate;
  };


  return (
    <TouchableOpacity
      style={styles.input}
      onPress={() => {
        setShow(true);
      }}
    > 
      <Text text={placeholder} bold opaque styles={{ color: COLORS.grayDark, fontSize: 16 }}/>
      { date && <Text text={getFormattedDate()} bold opaque/> }
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

InputDate.propTypes = {
  placeholder: PropTypes.string,
};

export default InputDate;
