// "use client";
// Styles & Images
import styles from "../page.module.css";

// Database
import { prisma } from "../lib/prisma";
import { ObjectId } from "mongodb";

const DoctorName = async ({ doctorId }) => {
  const doctorIdQuery = new ObjectId(doctorId).toString;

  const doctor = await prisma.doctor.findRaw({
    filter: {
      _id: { $eq: { $oid: doctorId } },
    },
  });

  // to do: almost done! just add a link to the doctor's name (to their page) and clean up the formatting for everything
  return (
    <div>
      <p>
        Doctor Name: {doctor.map((doc) => doc.firstName)}{" "}
        {doctor.map((doc) => doc.middleName)}{" "}
        {doctor.map((doc) => doc.lastName)}
      </p>
      <p>Link to doctor page: TBD</p>
    </div>
  );
};

const UserReviews = async ({ userEmail }) => {
  const userReviews = await prisma.review.findMany({
    where: {
      author: {
        email: {
          equals: userEmail,
        },
      },
    },
  });

  if (userReviews) {
    return (
      <div>
        {userReviews &&
          userReviews.map((rev) => {
            return (
              <div key={rev.id}>
                <DoctorName doctorId={rev.doctorId} />
                <p>Rating: {rev.rating}</p>
                <p>Title: {rev.title}</p>
                <p>Body: {rev.body}</p>
              </div>
            );
          })}
      </div>
    );
  }
};

export default UserReviews;
