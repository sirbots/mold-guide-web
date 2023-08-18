"use client";

// Auth
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";

export default function NewListingForm() {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    practiceName: "",
    phoneNumber: "",
    website: "",
    addressStreet: "",
    addressUnit: "",
    addressCity: "",
    addressState: "",
    addressZipcode: "",
    addressCountry: "USA",
    telehealth: "",
    shoemakerProtocol: "",
    conditionsTreated: "",
    certifications: "",
    seesPatientsIn: "",
    bio: "",
  });

  // new doctor upsert
  async function addRecord() {
    const prisma = new PrismaClient();

    const newPractitioner = await prisma.doctor.create({
      data: {
        slug: "update-this-slug", // TO DO: rewrite this to auto-generate
        published: false,
        firstName: formValues.firstName,
        middleName: formValues.middleName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        practiceName: formValues.practiceName,
        phoneNumber: formValues.phoneNumber,
        addressStreet: formValues.addressStreet,
        addressUnit: formValues.addressUnit,
        addressCity: formValues.addressCity,
        addressState: formValues.addressState,
        addressZipcode: formValues.addressZipcode,
        addressCountry: formValues.addressCountry,
        website: formValues.website,
        telehealth: formValues.telehealth,
        shoemakerProtocol: formValues.shoemakerProtocol, // TO DO: make this a Boolean on the form
        conditionsTreated: formValues.conditionsTreated, // TO DO: handle putting this into an array before sending | Array with default of "Mold Illness"
        certifications: formValues.certifications, // TO DO: handle this Array
        seesPatientsIn: formValues.seesPatientsIn, // TO DO: handle this Array
        bio: formValues.bio, // TO DO: handle this Array with default of "Coming Soon!"
        createdAt: formValues.createdAt, // TO DO: use current time
        lastModified: formValues.lastModified, // TO DO: use current time
      },
    });
    console.log(`Successfully seeded ${newPractitioner}`);
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setLoading(true);

    try {
      addRecord()
        .then(() => prisma.$disconnect())
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
        });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  return (
    <form className={styles.addListingForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="firstName">
          First Name:*
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="middleName">
          Middle Name:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="middleName"
          value={formValues.middleName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="lastName">
          Last Name:*
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="gender">
          Gender:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="gender"
          value={formValues.gender}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="email">
          Email:*
        </label>
        <input
          className={styles.formInput}
          type="email"
          // id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="practiceName">
          Practice Name:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="practiceName"
          value={formValues.practiceName}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          className={styles.formInput}
          type="tel"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="website">
          Website:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="website"
          value={formValues.website}
          onChange={handleChange}
        />
      </div>
      <p>Address</p>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressStreet">
          Street:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressStreet"
          value={formValues.addressStreet}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressUnit">
          Unit:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressUnit"
          value={formValues.addressUnit}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressCity">
          City:*
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressCity"
          value={formValues.addressCity}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressState">
          State or Province:*
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressState"
          value={formValues.addressState}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressZipcode">
          Zipcode or Postal Code:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressZipcode"
          value={formValues.addressZipcode}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="addressCountry">
          Country:*
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="addressCountry"
          value={formValues.addressCountry}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="telehealth">
          Telehealth offered?
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="telehealth"
          value={formValues.telehealth}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="shoemakerProtocol">
          Uses the Shoemaker Protocol?
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="shoemakerProtocol"
          value={formValues.shoemakerProtocol}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="conditionsTreated">
          Conditions Treated:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="conditionsTreated"
          value={formValues.conditionsTreated}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="certifications">
          Certifications:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="certifications"
          value={formValues.certifications}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="seesPatientsIn">
          What states do they see patients in?
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="seesPatientsIn"
          value={formValues.seesPatientsIn}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="bio">
          Bio or short description:
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="bio"
          value={formValues.bio}
          onChange={handleChange}
        />
      </div>
      <button className={styles.formBtn} type="submit" disabled={loading}>
        <span style={merriweather.style} className={styles.formBtnText}>
          {loading ? "Loading..." : "Add Listing"}
        </span>
      </button>
    </form>
  );
}
