"use client";

// React
import { useEffect, useState } from "react";

// Styles & Images
import styles from "../../page.module.css";

// Components
import Stars from "./Stars";

const ListingReviews = ({ listingId, listingType }) => {
  // Create the API url based on the listingType and listingId
  const apiUrl = `/api/reviews/${listingType}s/reviews-with-name/by-${listingType}-id/${listingId}`;
  const [hasReviews, setHasReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //
    async function getListingReviews() {
      const res = await fetch(apiUrl, {
        method: "GET",
      });
      const reviews = await res.json();

      // Set the reviews in state
      setReviews(reviews);

      // If there are reviews, set hasReviews to true so that they display
      if (reviews.length > 0) {
        setHasReviews(true);
      }
    }
    getListingReviews();
  }, []);

  if (!hasReviews) {
    return (
      <div className={styles.reviewsContainer}>
        <h2>Reviews</h2>
        <p>There are no reviews yet for this listing.</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsContainer}>
      <h2>Reviews</h2>

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
            <div
              key={rev.id}
              className={styles.review}
              data-test="single-review"
            >
              <h4
                style={{ marginBottom: "5px" }}
                data-test="single-review-title"
              >
                {rev.title}
              </h4>
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

export default ListingReviews;
