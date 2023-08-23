"use client";

import { cache, use } from "react";
import getAvgRating from "../lib/getAvgRating";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const getReviewsOfThisDoctor = cache((doctorId) =>
  fetch("/api/reviews/by-doctor-id/" + doctorId).then((res) => res.json())
);

export default function StarRatings({ doctorId }) {
  let reviewsOfThisDoctor = use(getReviewsOfThisDoctor(doctorId));
  const ratingsAvgRounded = getAvgRating(reviewsOfThisDoctor);

  console.log(ratingsAvgRounded);
  console.log("doctorId: " + doctorId);

  return (
    <div>
      <span>
        {[...Array(ratingsAvgRounded)].map((value, index) => (
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
        {[...Array(5 - ratingsAvgRounded)].map((value, index) => (
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