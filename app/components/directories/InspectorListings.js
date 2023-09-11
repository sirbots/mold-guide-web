"use client";

// React
import { useState, useEffect } from "react";

// Components
import Stars from "./Stars";

// Styles & Design
import styles from "../../page.module.css";

// Images
import Image from "next/image";
import inspection1 from "../../../public/inspection1.png";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import { stateNames, stateAbbreviationsArray } from "../../lib/stateNames";
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
        <span className={styles.listingName}>{companyName}</span>

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
        <a
          className={styles.listingBtn}
          href={"/inspection/" + slug}
          data-umami-event="View Profile Click"
          data-umami-event-form="Inspectors Directory"
        >
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

export default function InspectorListings({}) {
  const [inspectors, setInspectors] = useState();
  const [addressStatesIncluded, setAddressStatesIncluded] = useState(
    stateAbbreviationsArray
  );
  const [filterValues, setFilterValues] = useState({
    addressStateSelected: "CH",
  });

  // Call the API to get all of the published inspectors and reviews
  useEffect(() => {
    async function getInspectors() {
      const inspectorReviewsRes = await fetch("/api/reviews/inspectors", {
        method: "GET",
      });
      const reviews = await inspectorReviewsRes.json();

      const res = await fetch("/api/inspectors/published", {
        method: "GET",
      });
      const inspectorsObj = await res.json();
      let inspectors = await inspectorsObj;

      // Go through all the inspectors to create an average rating for each one
      inspectors.forEach((inspector) => {
        // Create an empty array to hold the ratings for this inspector
        const allRatings = [];

        // Go through every review and see if the inspector ID matches the current inspector
        reviews.forEach((rev) => {
          if (inspector.id == rev.inspectorId) {
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
          ratingsSum > 0
            ? parseInt(roundTo(ratingsSum / allRatings.length))
            : 0;

        // Add the average rating to the inspector object for this particular inspector
        inspector["avgRating"] = roundedAvg;
      });

      setInspectors(inspectors);

      let statesIncluded = inspectors.map(
        (inspector) => inspector.addressState
      );

      setAddressStatesIncluded(statesIncluded);
    }

    getInspectors();
  }, []);

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
