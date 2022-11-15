import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";

import Text from "./Text";
import { getFormattedDate } from "../utils/formatDate";

const InputDate = ({ placeholder, control, name, rules = null }) => {
  const [show, setShow] = useState(false);

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
        small
      />
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text text={getFormattedDate(field.value)} semiBold moreSmall opaque />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                mode="date"
                is24Hour={true}
                display="calendar"
                value={new Date(field.value)}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || field.value;
                  setShow(Platform.OS === "ios");
                  field.onChange(currentDate);
                }}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
        name={name}
        rules={rules}
        defaultValue={new Date()}
      />
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
  datePicker: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "red",
  },
});

InputDate.propTypes = {
  placeholder: PropTypes.string,
  control: PropTypes.object,
  name: PropTypes.string,
  rules: PropTypes.object,
};

export default InputDate;
