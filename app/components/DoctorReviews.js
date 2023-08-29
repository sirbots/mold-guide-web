"use client";

// React
import { cache, use, useState } from "react";

// Styles & Images
import styles from "../page.module.css";

// Components
import Stars from "./Stars";

// Pulls from a Prisma view that joins the reviews table with the users table (to get the user's display name)
const getDoctorReviews = cache((doctorId) =>
  fetch("/api/reviews-with-name/by-doctor-id/" + doctorId).then((res) =>
    res.json()
  )
);

const ReviewForm = ({ reviewMode, setReviewMode }) => {
  if (reviewMode == "hidden") {
    return (
      <a className={styles.heroBtn} onClick={() => setReviewMode("display")}>
        <span className={styles.heroBtnText}>Add a Review</span>
      </a>
    );
  }

  if (reviewMode == "display") {
    return (
      // left off here. build out the review form now!
      <div>
        <p>here goes the review form</p>
        <p>reviewMode: {reviewMode}</p>
      </div>
    );
  }
};

const DoctorReviews = ({ doctorId }) => {
  const [reviewMode, setReviewMode] = useState("hidden");

  let reviews = use(getDoctorReviews(doctorId));

  if (reviews.length === 0) {
    return (
      <div className={styles.doctorReviewsContainer}>
        <h3>Patient Reviews</h3>
        <p>There are no reviews yet for this practitioner.</p>
      </div>
    );
  }

  return (
    <div className={styles.doctorReviewsContainer}>
      <h3>Patient Reviews</h3>

      {/* <ReviewForm reviewMode={reviewMode} setReviewMode={setReviewMode} /> */}

      {reviews &&
        reviews.map((rev) => {
          // Format the review createdAt date
          const date = new Date(rev.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <div key={rev.id} className={styles.doctorReview}>
              <h4 style={{ marginBottom: "5px" }}>{rev.title}</h4>
              <Stars starCount={rev.rating} />

              <p style={{ marginTop: "5px" }}>{rev.body}</p>

              <p>
                posted by <b>{rev.authorName}</b> on {formattedDate}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default DoctorReviews;
