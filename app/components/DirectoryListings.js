"use client";

// React
import { useState } from "react";

// Styles & Design
import styles from "../page.module.css";

// Images
import Image from "next/image";
import maleDoctor2 from "../../public/male-doctor2.png";
import femaleDoctor6 from "../../public/female-doctor6.png";

// Helpers
import arrayToCommaString from "../lib/arrayToCommaString";
import formatMiddleName from "../lib/formatMiddleName";

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
  addressStateSelected,
}) => {
  if (addressStateSelected == "CH" || addressStateSelected == addressState) {
    return (
      <div className={styles.listing}>
        {/* Doctor Ratings */}
        {/* 
        <View style={styles.doctorListings.listing.starContainer}>
          <MaterialCommunityIcons
            name="star"
            size={24}
            style={styles.doctorListings.listing.star}
          />
          <MaterialCommunityIcons
            name="star-half-full"
            size={24}
            style={styles.doctorListings.listing.star}
          />
          <MaterialCommunityIcons
            name="star-outline"
            size={24}
            style={styles.doctorListings.listing.star}
          />
        </View>
         */}

        {/* Name */}
        <span className={styles.doctorName}>
          {firstName + " " + formatMiddleName(middleName) + " " + lastName}
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
const ResultsFilter = ({ addressStateSelected, setAddressStateSelected }) => {
  const handleChange = (e) => {
    // TO DO: Create a formValues state object when you expand to other filters
    const { name, value } = e.target;
    setAddressStateSelected(value);
  };

  return (
    <>
      <form className={styles.filterForm}>
        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="addressState">
            Filter by State:
          </label>
          <select
            className={styles.formInput}
            name="addressState"
            id="addressState"
            onChange={handleChange}
          >
            {/* TO DO: Only list states available in the DB */}
            <option value="CH">Choose Your State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default function DirectoryListings({ directoryType, listingsObject }) {
  const practitioners = listingsObject;

  const [addressStateSelected, setAddressStateSelected] = useState("CH");

  return (
    <>
      <ResultsFilter
        addressStateSelected={addressStateSelected}
        setAddressStateSelected={setAddressStateSelected}
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
              profilePhoto="TO DO: insert this dynamically"
              addressStateSelected={addressStateSelected}
            />
          ))}
      </div>
    </>
  );
}
