// calculate by average rating
// it will show 5 stars
// if rating is 4.5, it will show 4.5 stars

// example:
// stars  - quantity
// 5      -  20
// 4    -  10
// 3    -   30
// 2    -   10
// 1    -   20

// average rating is 3.5

export const calculateRating = (rating) => {
  const { stars, quantity } = rating;
  const averageRating = stars / quantity;
  return averageRating;
};
