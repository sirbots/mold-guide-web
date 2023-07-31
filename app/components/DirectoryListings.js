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
}) => {
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
};

// Filter Component
const ResultsFilter = ({ addressStateSelected, setAddressStateSelected }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressStateSelected(value);
  };

  // Handles the submit event on form submit.
  // const handleSubmit = async (e) => {
  //   // Stop the form from submitting and refrehsing the page.
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     setFormValues({ email: "", password: "" });

  //     const res = await signIn("credentials", {
  //       redirect: false,
  //       email: formValues.email,
  //       password: formValues.password,
  //       callbackUrl,
  //     });

  //     setLoading(false);

  //     // console.log(res);
  //     if (!res?.error) {
  //       router.push(callbackUrl);
  //     } else {
  //       setError("invalid email or password");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error);
  //   }
  // };

  return (
    <>
      <form className={styles.filterForm}>
        <p>The currently selected state is:</p>
        <p>{addressStateSelected}</p>

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="stateName">
            State:
          </label>
          <select
            className={styles.formInput}
            name="addressState"
            id="addressState"
            onChange={handleChange}
          >
            <option value="AK">Arkansas</option>
            <option value="AZ">Arizona</option>
          </select>
          <input

          // value={formValues.addressState}
          // onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
};

export default function DirectoryListings({ directoryType, listingsObject }) {
  const practitioners = listingsObject;

  const [addressStateSelected, setAddressStateSelected] = useState("None");

  return (
    <>
      <ResultsFilter
        addressStateSelected={addressStateSelected}
        setAddressStateSelected={setAddressStateSelected}
      />

      {/* TO DO: pass addressStateSelected to the DoctorListing component so only the filtered results are displayed  */}
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
            />
          ))}
      </div>
    </>
  );
}
