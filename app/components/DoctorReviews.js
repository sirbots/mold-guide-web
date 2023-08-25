"use client";
import { useState, useEffect, Suspense, cache, use } from "react";

// Styles & Images
import styles from "../page.module.css";

// Components
import Stars from "./Stars";

const UserName = (userName) => {
  return (
    <>
      {/* <p>{userName}</p>; */}
      <p>username here</p>
    </>
  );
};

const DoctorReviews = ({ doctorId }) => {
  const [isLoading, setLoading] = useState(true);
  const [reviewsWithEmails, setReviewsWithEmails] = useState(null);

  useEffect(() => {
    let reviews = [];
    fetch("/api/reviews-with-displayname/by-doctor-id/" + doctorId)
      .then((res) => res.json())
      .then((reviewData) => {
        reviews = reviewData;
        // review["userEmail"] = "test@test.com";
        // console.log(data);
      })
      // .then(() => {
      //   // console.log(reviews);
      //   reviews.forEach((review) => {
      //     fetch("/api/users/" + review.authorId)
      //       .then((res) => res.json())
      //       .then((userData) => {
      //         // console.log(userData);
      //         review["userEmail"] = userData.email;
      //         // console.log(review);
      //       });
      //   });
      // })
      .then(() => {
        console.log("here is the state object before updating it:");
        console.log(reviewsWithEmails);
        console.log("here are the reviews before pushing to state:");
        console.log(reviews);
        setReviewsWithEmails(reviews);
        setLoading(false);
      });
  }, [doctorId]);

  if (isLoading)
    return (
      <div className={styles.doctorReviewsContainer}>
        <h3>Patient Reviews</h3>
        <p>Loading...</p>
      </div>
    );

  if (!reviewsWithEmails) {
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

      {reviewsWithEmails &&
        reviewsWithEmails.map((rev) => {
          return (
            <div key={rev.id} className={styles.doctorReview}>
              <h4 style={{ marginBottom: "5px" }}>{rev.title}</h4>
              <Stars starCount={rev.rating} />

              <p style={{ marginTop: "5px" }}>{rev.body}</p>

              <p>{rev.userEmail}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DoctorReviews;
