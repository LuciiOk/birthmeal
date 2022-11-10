import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Text from "./Text";

import AxiosInstance from "../utils/AxiosInstance";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ValorationConfirm from "../containers/ValorationConfirm";

const Valoration = ({ rat, stablishmentId }) => {
  const [rating, setRating] = useState(rat);
  const [starsSelected, setStarsSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const { token, user, isLogged } = useContext(AuthContext);

  const onStarPress = async (valoration) => {
    try {
      
      if ((await isLogged()) && token && user) {
        const response = await AxiosInstance.post(
          `companies/rating/${stablishmentId}`,
          {
            valoration: valoration - 1,
          }
        );
        setRating(response.data);
      } else {
        alert("Debes iniciar sesión para valorar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <Icons
            key={i}
            name="star"
            size={26}
            color="#FFD700"
            onPress={() => {
              setStarsSelected(i + 1);
              setVisible(true);
            }}
          />
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <Icons
            key={i}
            name="star-half-o"
            size={26}
            color="#FFD700"
            onPress={() => {
              setStarsSelected(i + 1);
              setVisible(true);
            }}
          />
        );
      } else {
        stars.push(
          <Icons
            key={i}
            name="star-o"
            size={26}
            color="#FFD700"
            onPress={() => {
              setStarsSelected(i + 1);
              setVisible(true);
            }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>{renderStars()}</View>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} text={rating.toFixed(2)} />
      </View>
      <ValorationConfirm
        visible={visible}
        setVisible={setVisible}
        onConfirm={() => onStarPress(starsSelected)}
        starsSelected={starsSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    marginHorizontal: 2,
  },
  ratingContainer: {
    marginLeft: 10,
  },
  rating: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

Valoration.propTypes = {
  stablishmentId: PropTypes.string.isRequired,
  rat: PropTypes.number.isRequired,
};

export default Valoration;
