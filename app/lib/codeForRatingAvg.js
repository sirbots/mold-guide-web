// Holding this code here because I wrote it for something else and didn't need it, but will need it on the single doctor pages

// Find the average of the doctor's rating by querying the Reviews model to find all of the reviews with that doctor ID
const reviewsOfThisDoctor = await prisma.review.findMany({
  where: {
    doctorId: {
      equals: doctor.id,
    },
  },
});

// Create a new array with just the doctor's ratings, get a count of total ratings, and then find the average rating
const allRatings = reviewsOfThisDoctor.map((rev) => rev.rating);
const ratingsCount = allRatings.length;
const ratingsSum = allRatings.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
const ratingsAvg = roundTo(ratingsSum / ratingsCount);

const SomeComponent = async ({ doctorId }) => {
  const doctor = await prisma.doctor.findRaw({
    filter: {
      _id: { $eq: { $oid: doctorId } },
    },
  });

  return (
    // ...

    <span>
      {[...Array(ratingsAvg)].map((value, index) => (
        <StarIconSolid
          // colors:
          // #f5e085
          // #239EA1
          // #336765
          key={index}
          className="h-12 w-12"
          stroke="currentColor"
          style={{
            height: "25px",
            width: "25px",
            color: "#239EA1",
          }}
        />
      ))}
      {[...Array(5 - ratingsAvg)].map((value, index) => (
        <StarIconOutline
          key={index}
          className="h-12 w-12"
          stroke="currentColor"
          style={{
            height: "25px",
            width: "25px",
            color: "#239EA1",
          }}
        />
      ))}
    </span>

    //   ...
  );
};
