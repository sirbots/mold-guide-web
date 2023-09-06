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
import maleDoctor2 from "../../../public/male-doctor2.png";
import femaleDoctor6 from "../../../public/female-doctor6.png";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import formatMiddleName from "../../lib/formatMiddleName";
import stateNames from "../../lib/stateNames";
import roundTo from "../../lib/roundTo";

// Doctor Listing Component
const DoctorListing = ({
  slug,
  firstName,
  middleName,
  lastName,
  gender,
  addressCity,
  addressState,
  certifications,
  profilePhoto,
  shoemakerProtocol,
  addressStateSelected,
  shoemakerProtocolSelected,
  avgRating,
}) => {
  // Round the ratingAverage double
  const ratingRounded = avgRating != undefined ? roundTo(avgRating) : 0;

  // Filter results based on user-selected filters on page
  if (
    (addressStateSelected == "CH" || addressStateSelected == addressState) &&
    (shoemakerProtocolSelected == "any" ||
      shoemakerProtocolSelected == shoemakerProtocol.toString())
  ) {
    return (
      <div className={styles.listing}>
        {/* Name */}
        <span className={styles.doctorName}>
          {firstName + " " + formatMiddleName(middleName) + " " + lastName}
        </span>

        {/* Stars */}
        <Stars starCount={ratingRounded} />

        {/* Address */}
        <span className={styles.doctorLocation}>
          {addressCity ? addressCity + ", " : ""}{" "}
          {addressState ? addressState : ""}
        </span>

        {/* Doctor Photo */}
        {/* TO DO: Pull this in from MongoDB */}
        <Image
          src={gender == "male" ? maleDoctor2 : femaleDoctor6}
          className={styles.doctorListingsImg}
          alt="doctor photo"
        />

        {/* Doctor Metadata */}
        <span className={styles.doctorCertification}>
          {certifications ? arrayToCommaString(certifications) : " "}
        </span>

        {/* Button */}
        <a className={styles.listingBtn} href={"/practitioners/" + slug}>
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

          {/* Filter by Protocol */}
          <select
            className={styles.formInput}
            name="shoemakerProtocolSelected"
            id="shoemakerProtocolSelected"
            onChange={handleChange}
          >
            <option value="any">Any Protocol</option>
            <option value="true">Shoemaker Protocol</option>
            <option value="false">Not Shoemaker Protocol</option>
          </select>
        </div>
      </form>
    </>
  );
};

const getPublishedDoctors = cache(() =>
  fetch("/api/doctors/published").then((res) => res.json())
);
const getReviews = cache(() => fetch("/api/reviews").then((res) => res.json()));

export default function DirectoryListings({ directoryType }) {
  // Call the API to get all of the published doctors and reviews
  let reviews = use(getReviews());
  let doctors = use(getPublishedDoctors());

  // Go through all the doctors
  doctors.forEach((prac) => {
    // Create an empty array to hold the ratings for this doctor
    const allRatings = [];

    // Go through every review and see if the doctor ID matches the current doctor
    reviews.forEach((rev) => {
      if (prac.id == rev.doctorId) {
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

    // Add the average rating to the doctor object for this particular doctor
    prac["avgRating"] = roundedAvg;
  });

  // const [addressStateSelected, setAddressStateSelected] = useState("CH");
  const [filterValues, setFilterValues] = useState({
    addressStateSelected: "CH",
    shoemakerProtocolSelected: "any",
  });

  const addressStatesIncluded = doctors.map((doc) => doc.addressState);

  return (
    <>
      <ResultsFilter
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        addressStatesIncluded={addressStatesIncluded}
      />

      <div className={styles.listingsContainer}>
        {doctors &&
          doctors.map((doc) => (
            <DoctorListing
              key={doc.id}
              slug={doc.slug}
              firstName={doc.firstName}
              middleName={doc.middleName}
              lastName={doc.lastName}
              addressCity={doc.addressCity}
              addressState={doc.addressState}
              certifications={doc.certifications}
              gender={doc.gender}
              shoemakerProtocol={doc.shoemakerProtocol}
              profilePhoto="TO DO: insert this dynamically"
              addressStateSelected={filterValues.addressStateSelected}
              shoemakerProtocolSelected={filterValues.shoemakerProtocolSelected}
              avgRating={doc.avgRating}
            />
          ))}
      </div>
    </>
  );
}
