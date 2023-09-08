"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Styles & Fonts
import styles from "./forms.module.css";
import { Lora, Merriweather } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function AddRemediatorForm() {
  let [sending, setSending] = useState(false);
  let [certificationsOtherDisabled, setCertificationsOtherDisabled] =
    useState(true);

  let [formValues, setFormValues] = useState({
    companyName: "",
    phoneNumber: "",
    addressStreet: "",
    addressUnit: "",
    addressCity: "",
    addressState: "",
    addressZipcode: "",
    addressCountry: "USA",
    website: "",
    // certifications: [], // Array
    bio: [], // Array
    createdAt: new Date(),
    lastModified: new Date(),

    // These are in the form, but get merged with other fields or manipulated before being sent to the API
    // certificationsOther: "", // String
  });

  // Initialize the router because redirect doesn't seem to work in client components
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setSending(true);

    // Move from the formValues to a data object
    let data = formValues;

    // Format the company name
    let formattedCompanyName = formValues.companyName.split(" ");

    // Format the new slug
    data["slug"] =
      `${formattedCompanyName}-${formValues.addressCity}-${formValues.addressState}`.toLowerCase();

    // Add any "other" certifications to the certifications array. Delete the "other" field.
    // data["certifications"] = [
    //   ...formValues.certifications,
    //   formValues.certificationsOther,
    // ];
    // delete data["certificationsOther"];

    // Arrange bio into an array
    if (formValues.bio != "") {
      data["bio"] = formValues.bio.split("\n\n");
    }

    try {
      fetch("/api/remediators", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          // Check for errors from the API
          if (!res.ok) {
            // Reset the button text
            setSending(false);

            // If the statusText == "conflict", it means that the record already exists in the database.
            if (res.statusText == "Conflict") {
              alert(
                "That remediator already exists. If you think this is an error, please contact us."
              );
            } else {
              // Alert with some other error message
              alert(
                "Ooops. Received an error with this message: " +
                  res.statusText +
                  "\n\nPlease contact us for help."
              );
            }
          }
          // Redirect to the TY page if the form was submitted successfully.
          if (res.ok) {
            router.push("/add-listing/thank-you-remediator");
          }
        })
        .then(() => {
          // Send an email notification to let you know that a new remediator was submitted
          try {
            fetch("/api/email/content-submission-notification", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ formSubmitted: "Remediator Listing" }),
            });

            // Send an Umami event
            umami.track("Remediator Submitted");
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <form className={styles.addListingForm} onSubmit={handleSubmit}>
        <h2 className={lora.className}>Add a Remediator</h2>
        <p className={styles.formDescription}>
          Submit the form below to add a new remediator to the directory. Fields
          marked with an asterisk (*) are required.
        </p>
        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="companyName">
            Company Name:*
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="companyName"
            value={formValues.companyName}
            onChange={handleChange}
            required
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

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="addressStreet">
            Street Address:
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

        {/* Certifications (removed for now) */}

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="bio">
            About the Company:
          </label>
          <textarea
            className={styles.formInputTextArea}
            type="text"
            name="bio"
            value={formValues.bio}
            onChange={handleChange}
          />
        </div>
        <button className={styles.formBtn} type="submit" disabled={sending}>
          <span style={merriweather.style} className={styles.formBtnText}>
            {sending ? "Sending..." : "Add Listing"}
          </span>
        </button>
      </form>
    </>
  );
}
