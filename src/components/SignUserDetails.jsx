import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

import { COLORS } from "../constants/colorSchema";
import Text from "./Text";
import { AuthContext } from "../contexts/AuthContext";

const SignUserDetails = ({ to, text, redirectText, alignText = "center" }) => {
  const { setError } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const navigate = () => {
    setError(null);
    navigation.navigate(to);
  };

  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
      }}
    >
      {text && <Text text={text} light styles={{ textAlign: alignText }} />}
      <TouchableOpacity onPress={navigate}>
        <Text
          text={redirectText}
          bold
          styles={{ textAlign: alignText, color: COLORS.dark }}
        />
      </TouchableOpacity>
    </View>
  );
};

SignUserDetails.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  redirectText: PropTypes.string.isRequired,
  alignText: PropTypes.string,
};

export default SignUserDetails;
