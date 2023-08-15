// Database
import { prisma } from "./prisma";
import roundTo from "./roundTo";

const getAvgRating = async (doctorId) => {
  // Find the average of the doctor's rating by querying the Reviews model to find all of the reviews with that doctor ID
  const reviewsOfThisDoctor = await prisma.review.findMany({
    where: {
      doctorId: {
        equals: doctorId,
      },
    },
  });

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
