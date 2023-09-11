"use client";

import { useEffect, useState } from "react";
import getAvgRating from "../../lib/getAvgRating";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function SingleListingStarRatings({ listingId, listingType }) {
  // Build the apiUrl based on the listingType and listingId
  const apiUrl = `/api/reviews/${listingType}s/by-${listingType}-id/${listingId}`;

  const [avgRatingRounded, setAvgRatingRounded] = useState(0);

  useEffect(() => {
    async function getAvgRatingForThisListing() {
      // Fetch the reviews for this listing from the API
      const res = await fetch(apiUrl, {
        method: "GET",
      });
      const reviews = await res.json();

      // Calculate the average rating using the getAvgRating() library function
      const ratingsAvgRounded = getAvgRating(reviews);

      // Set the averge rating in state
      setAvgRatingRounded(ratingsAvgRounded);
    }

    getAvgRatingForThisListing();
  }, []);

  return (
    <div>
      <span>
        {[...Array(avgRatingRounded)].map((value, index) => (
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
        {[...Array(5 - avgRatingRounded)].map((value, index) => (
          <StarIconOutline
            key={index}
            className="h-12 w-12"
            stroke="currentColor"
            style={{ height: "25px", width: "25px", color: "#239EA1" }}
          />
        ))}
      </span>
    </div>
  );
}
