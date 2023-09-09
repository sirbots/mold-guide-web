// "use client";
// Styles & Images
import styles from "../../page.module.css";

// Components
import Stars from "./Stars";

// Database
import { prisma } from "../../lib/prisma";

// Helpers
import formatMiddleName from "../../lib/formatMiddleName";

// use the doctorId to find the rest of the doctor's info
const DoctorMetaData = async ({ doctorId }) => {
  const doctor = await prisma.doctor.findRaw({
    filter: {
      _id: { $eq: { $oid: doctorId } },
    },
  });

  return (
    <div>
      <p>
        <a href={"/practitioners/" + doctor.map((doc) => doc.slug)}>
          {doctor.map((doc) => doc.firstName)}{" "}
          {doctor.map((doc) => formatMiddleName(doc.middleName))}{" "}
          {doctor.map((doc) => doc.lastName)}
        </a>
      </p>
    </div>
  );
};

const UserReviews = async ({ userEmail }) => {
  const userReviews = await prisma.doctorReview.findMany({
    where: {
      author: {
        email: {
          equals: userEmail,
        },
      },
    },
  });

  if (userReviews.length > 0) {
    return (
      <div className="userReviewsContainer">
        {userReviews &&
          userReviews.map((rev) => {
            return (
              <div style={{ marginBottom: "55px" }} key={rev.id}>
                <DoctorMetaData doctorId={rev.doctorId} />
                <Stars starCount={rev.rating} />

                <p>Title: {rev.title}</p>
                <p>Body: {rev.body}</p>
              </div>
            );
          })}
      </div>
    );
  } else {
    return (
      <div style={{ marginBottom: "55px" }}>
        <p>Your reviews will appear here.</p>
      </div>
    );
  }
};

export default UserReviews;
