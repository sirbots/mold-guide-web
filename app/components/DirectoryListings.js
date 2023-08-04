"use client";

// React
import { useState } from "react";

// Styles & Design
import styles from "../page.module.css";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

// Images
import Image from "next/image";
import maleDoctor2 from "../../public/male-doctor2.png";
import femaleDoctor6 from "../../public/female-doctor6.png";

// Helpers
import arrayToCommaString from "../lib/arrayToCommaString";
import formatMiddleName from "../lib/formatMiddleName";
import stateNames from "../lib/stateNames";

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
  ratingAverage,
}) => {
  // Round the ratingAverage double
  const ratingRounded = roundTo(ratingAverage);

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
        <span>
          {[...Array(ratingRounded)].map((value, index) => (
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
          {[...Array(5 - ratingRounded)].map((value, index) => (
            <StarIconOutline
              key={index}
              className="h-12 w-12"
              stroke="currentColor"
              style={{ height: "25px", width: "25px", color: "#239EA1" }}
            />
          ))}
        </span>

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
          alt="Practitioner photo"
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

export default function DirectoryListings({ directoryType, listingsObject }) {
  const practitioners = listingsObject;

  // const [addressStateSelected, setAddressStateSelected] = useState("CH");
  const [filterValues, setFilterValues] = useState({
    addressStateSelected: "CH",
    shoemakerProtocolSelected: "any",
  });

  const addressStatesIncluded = practitioners.map((doc) => doc.addressState);

  return (
    <>
      <ResultsFilter
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        addressStatesIncluded={addressStatesIncluded}
      />

      <div className={styles.listingsContainer}>
        {practitioners &&
          practitioners.map((doc) => (
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
            />
          ))}
      </div>
    </>
  );
}
