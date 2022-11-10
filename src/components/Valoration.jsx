import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";
import Text from "./Text";

import AxiosInstance from "../utils/AxiosInstance";

const Valoration = ({ rat, stablishmentId }) => {
  const [rating, setRating] = useState(rat);

  const onStarPress = async (valoration) => {
    try {
      const response = await AxiosInstance.post(
        `companies/rating/${stablishmentId}`,
        {
          valoration,
        }
      );
      setRating(response.data);
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
            size={20}
            color="#FFD700"
            onPress={() => onStarPress(i)}
          />
        );
      } else if (i === Math.floor(rating)) {
        stars.push(
          <Icons
            key={i}
            name="star-half-o"
            size={20}
            color="#FFD700"
            onPress={() => onStarPress(i)}
          />
        );
      } else {
        stars.push(
          <Icons
            key={i}
            name="star-o"
            size={20}
            color="#FFD700"
            onPress={() => onStarPress(i)}
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
