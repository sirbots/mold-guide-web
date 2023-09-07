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
import inspection1 from "../../../public/inspection1.png";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import stateNames from "../../lib/stateNames";
import roundTo from "../../lib/roundTo";

// Inspector Listing Component
const InspectorListing = ({
  id,
  slug,
  companyName,
  phoneNumber,
  addressStreet,
  addressUnit,
  addressCity,
  addressState,
  addressZipcode,
  addressCountry,
  website,
  certifications,
  bio,
  avgRating,
  addressStateSelected,
}) => {
  // Round the ratingAverage double
  const ratingRounded = avgRating != undefined ? roundTo(avgRating) : 0;

  // Filter results based on user-selected filters on page
  if (addressStateSelected == "CH" || addressStateSelected == addressState) {
    return (
      <div className={styles.listing}>
        {/* Company Name */}
        <span className={styles.name}>{companyName}</span>

        {/* Stars */}
        <Stars starCount={ratingRounded} />

        {/* Address */}
        <span className={styles.location}>
          {addressCity ? addressCity + ", " : ""}{" "}
          {addressState ? addressState : ""}
        </span>

        {/*  Photo */}
        {/* TO DO: Pull this in from MongoDB */}
        <Image
          src={inspection1}
          className={styles.listingImg}
          alt="inspector photo"
        />

        {/* Metadata */}
        <span className={styles.certification}>
          {certifications ? arrayToCommaString(certifications) : " "}
        </span>

        {/* Button */}
        <a className={styles.listingBtn} href={"/inspection/" + slug}>
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

const getPublishedInspectors = cache(() =>
  fetch("/api/inspectors/published").then((res) => res.json())
);
const getReviews = cache(() =>
  fetch("/api/reviews/inspectors").then((res) => res.json())
);

export default function InspectorListings({}) {
  // Call the API to get all of the published inspectors and reviews
  let reviews = use(getReviews());
  let inspectors = use(getPublishedInspectors());

  // Go through all the listings
  inspectors.forEach((inspector) => {
    // Create an empty array to hold the ratings for this inspector
    const allRatings = [];

    // Go through every review and see if the inspector ID matches the current inspector
    reviews.forEach((rev) => {
      if (inspector.id == rev.inspectorId) {
        allRatings.push(rev.rating);
      }
    });

    // console.log(allRatings);

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

    // Add the average rating to the inspector object for this particular inspector
    inspector["avgRating"] = roundedAvg;
  });

  // Set the initial filter values
  const [filterValues, setFilterValues] = useState({
    addressStateSelected: "CH",
  });

  const addressStatesIncluded = inspectors.map(
    (inspector) => inspector.addressState
  );

  return (
    <>
      <ResultsFilter
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        addressStatesIncluded={addressStatesIncluded}
      />

      <div className={styles.listingsContainer}>
        {inspectors &&
          inspectors.map((inspector) => (
            <InspectorListing
              key={inspector.id}
              slug={inspector.slug}
              companyName={inspector.companyName}
              lastName={inspector.lastName}
              addressCity={inspector.addressCity}
              addressState={inspector.addressState}
              certifications={inspector.certifications}
              addressStateSelected={filterValues.addressStateSelected}
              avgRating={inspector.avgRating}
            />
          ))}
      </div>
    </>
  );
}
