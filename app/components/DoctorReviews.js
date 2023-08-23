"use client";
import { cache, use } from "react";

// Styles & Images
import styles from "../page.module.css";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

// Helpers
import formatMiddleName from "../lib/formatMiddleName";
import roundTo from "../lib/roundTo";

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
              <div key={rev.id}>
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
