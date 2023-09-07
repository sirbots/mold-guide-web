"use client";

// React
import { useState } from "react";
import React, { cache, use } from "react";

// Components
import Stars from "./Stars";

// Styles & Design
import styles from "../../page.module.css";

// Images
import Image from "next/image";
import remediation1 from "../../../public/remediation1.png";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import formatMiddleName from "../../lib/formatMiddleName";
import stateNames from "../../lib/stateNames";
import roundTo from "../../lib/roundTo";

// remediator Listing Component
const RemediatorListing = ({
  id,
  slug,
  companyName,
  addressCity,
  addressState,
  certifications,
  profilePhoto,
  addressStateSelected,
  avgRating,
}) => {
  // Round the ratingAverage double
  const ratingRounded = avgRating != undefined ? roundTo(avgRating) : 0;

  // Filter results based on user-selected filters on page
  if (addressStateSelected == "CH" || addressStateSelected == addressState) {
    return (
      <div className={styles.listing}>
        {/* Stars */}
        <Stars starCount={ratingRounded} />

        {/* Name */}
        <span className={styles.listingName}>{companyName}</span>

        {/* Address */}
        <span className={styles.location}>
          {addressCity ? addressCity + ", " : ""}{" "}
          {addressState ? addressState : ""}
        </span>

        {/* Photo */}
        {/* TO DO: Pull this in from MongoDB */}
        <Image
          src={remediation1}
          className={styles.listingImg}
          alt="Remediator photo"
        />

        {/* Metadata */}
        <span className={styles.certification}>
          {certifications ? arrayToCommaString(certifications) : " "}
        </span>

        {/* Button */}
        <a className={styles.listingBtn} href={"/remediation/" + slug}>
          <span className={styles.listingBtnText}>View Profile</span>
        </a>
      </div>
    );
  }
};

// Filter Component
const ResultsFilter = ({
  filterValues,
  setFilterValues,
  addressStatesIncluded,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  return (
    <>
      <form className={styles.filterForm}>
        <div className={styles.formRow}>
          {/* Filter by State */}
          <select
            className={styles.formInput}
            name="addressStateSelected"
            id="addressStateSelected"
            onChange={handleChange}
          >
            <option value="CH">Any State</option>
            {stateNames &&
              stateNames.map((theState) => {
                if (addressStatesIncluded.includes(theState["abbreviation"])) {
                  return (
                    <option
                      key={theState["abbreviation"]}
                      value={theState["abbreviation"]}
                    >
                      {theState["fullName"]}
                    </option>
                  );
                }
              })}
          </select>
        </div>
      </form>
    </>
  );
};

const getPublishedRemediators = cache(() =>
  fetch("/api/remediators/published").then((res) => res.json())
);
const getReviews = cache(() =>
  fetch("/api/reviews/remediators").then((res) => res.json())
);

export default function RemediatorListings({}) {
  // Call the API to get all of the published remediators and reviews
  let reviews = use(getReviews());
  let remediators = use(getPublishedRemediators());

  // Go through all the remediators
  remediators.forEach((remediator) => {
    // Create an empty array to hold the ratings for this remediator
    const allRatings = [];

    // Go through every review and see if the remediator ID matches the current remediator
    reviews.forEach((rev) => {
      if (remediator.id == rev.remediatorId) {
        allRatings.push(rev.rating);
      }
    });

    // Use a reducr to sum up all of the ratings
    const ratingsSum = parseFloat(
      allRatings.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );

    // Calculate a rounded average if the rating is higher than 0
    const roundedAvg =
      ratingsSum > 0 ? parseInt(roundTo(ratingsSum / allRatings.length)) : 0;

    // Add the average rating to the remediator object for this particular remediator
    remediator["avgRating"] = roundedAvg;
  });

  // const [addressStateSelected, setAddressStateSelected] = useState("CH");
  const [filterValues, setFilterValues] = useState({
    addressStateSelected: "CH",
  });

  const addressStatesIncluded = remediators.map(
    (remediator) => remediator.addressState
  );

  return (
    <>
      <ResultsFilter
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        addressStatesIncluded={addressStatesIncluded}
      />

      <div className={styles.listingsContainer}>
        {remediators &&
          remediators.map((remediator) => (
            <RemediatorListing
              key={remediator.id}
              slug={remediator.slug}
              companyName={remediator.companyName}
              addressCity={remediator.addressCity}
              addressState={remediator.addressState}
              certifications={remediator.certifications}
              profilePhoto="TO DO: insert this dynamically"
              addressStateSelected={filterValues.addressStateSelected}
              avgRating={remediator.avgRating}
            />
          ))}
      </div>
    </>
  );
}
