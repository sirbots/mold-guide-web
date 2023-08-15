// "use client";
// Styles & Images
import styles from "../page.module.css";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

// Database
import { prisma } from "../lib/prisma";

// Helpers
import formatMiddleName from "../lib/formatMiddleName";
import roundTo from "../lib/roundTo";

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
      <div className="userReviewsContainer">
        {userReviews &&
          userReviews.map((rev) => {
            return (
              <div key={rev.id}>
                <DoctorMetaData doctorId={rev.doctorId} />
                <span>
                  {[...Array(rev.rating)].map((value, index) => (
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
                  {[...Array(5 - rev.rating)].map((value, index) => (
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
