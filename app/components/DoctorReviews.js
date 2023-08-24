"use client";
import { cache, use } from "react";

// Styles & Images
import styles from "../page.module.css";

// Components
import Stars from "./Stars";

const getReviewsOfThisDoctor = cache((doctorId) =>
  fetch("/api/reviews/by-doctor-id/" + doctorId).then((res) => res.json())
);

const DoctorReviews = ({ doctorId }) => {
  let reviewsOfThisDoctor = use(getReviewsOfThisDoctor(doctorId));

  console.log("doctorId: " + doctorId);
  console.log(reviewsOfThisDoctor);

  if (reviewsOfThisDoctor.length === 0) {
    return (
      <div className={styles.doctorReviewsContainer}>
        <h3>Patient Reviews</h3>
        <p>There are no reviews yet for this practitioner.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.doctorReviewsContainer}>
        <h3>Patient Reviews</h3>

        {reviewsOfThisDoctor &&
          reviewsOfThisDoctor.map((rev) => {
            return (
              <div key={rev.id} className={styles.doctorReview}>
                <h4>{rev.title}</h4>
                <Stars starCount={rev.rating} />

                <p>{rev.body}</p>
                <p>Insert reviewer screenname here.</p>
              </div>
            );
          })}
      </div>
    );
  }
};

export default DoctorReviews;
