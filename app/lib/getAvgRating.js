// Desc: Function to get the average rating of a doctor
import roundTo from "./roundTo";

const getAvgRating = (reviewsOfThisDoctor) => {
  // Return a 0 rating if there are no reviews
  if (reviewsOfThisDoctor.length === 0) {
    return 0;
  }

  // Create a new array with just the doctor's ratings, get a count of total ratings, and then find the average rating
  const allRatings = reviewsOfThisDoctor.map((rev) => parseFloat(rev.rating));
  const ratingsCount = allRatings.length;
  const ratingsSum = parseFloat(
    allRatings.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
  );

  const roundedAvg = parseInt(roundTo(ratingsSum / ratingsCount));
  return roundedAvg;
};

export default getAvgRating;
