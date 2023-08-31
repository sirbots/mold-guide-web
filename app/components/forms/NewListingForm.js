"use client";

import { useState, cache, use } from "react";
import { useRouter } from "next/navigation";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function NewListingForm() {
  let [sending, setSending] = useState(false);
  // let [telehealthChecked, setTelehealthChecked] = useState(false);
  let [formValues, setFormValues] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    gender: "",
    practiceName: "",
    phoneNumber: "",
    website: "",
    addressStreet: "",
    addressUnit: "",
    addressCity: "Springfield",
    addressState: "MA",
    addressZipcode: "",
    addressCountry: "USA",
    telehealth: false,
    shoemakerProtocol: false,
    conditionsTreated: "", // String[] @default(["Mold Illness"])
    certifications: "", // String[] @default([""])
    seesPatientsIn: "", // String[] @default([""])
    bio: "", // String[] @default(["Coming soon!"])
    createdAt: new Date(),
    lastModified: new Date(),
  });

  // Initialize the router because redirect doesn't seem to work in client components
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setSending(true);

    // Before sending the form, add the slug to the form data
    let data = formValues;

    // Add handing for blank middle name
    let formattedMiddleName = formValues.middleName;
    // If the middleName field isn't blank, use the middle name plus a dash
    if (formValues.middleName != "") {
      formattedMiddleName = formValues.middleName + "-";
    }
    // Format the new slug
    data[
      "slug"
    ] = `${formValues.firstName}-${formattedMiddleName}${formValues.lastName}-${formValues.addressCity}-${formValues.addressState}`;

    // console.log("The formatted data object:");
    // console.log(data);
    try {
      fetch("/api/doctors", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          // Reset the button text
          setSending(false);

          // Check for errors from the API
          if (!res.ok) {
            // If the statusText == "conflict", it means that the record already exists in the database.
            if (res.statusText == "Conflict") {
              alert(
                "That doctor already exists. If you think this is an error, please contact us."
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
            router.push("/add-listing/thank-you");
          }
        })
        .then(() => {
          // Send an email notification to let you know that a new doctor was submitted
          try {
            fetch("/api/email/notifications", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ formSubmitted: "Doctor Listing" }),
            });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
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
          type="checkbox"
          name="telehealth"
          defaultChecked={false}
          onChange={() =>
            setFormValues({ ...formValues, telehealth: !formValues.telehealth })
          }
        />
        <label className={styles.formLabel} htmlFor="shoemakerProtocol">
          Uses the Shoemaker Protocol?
        </label>
        <input
          className={styles.formInput}
          type="checkbox"
          name="shoemakerProtocol"
          defaultChecked={false}
          onChange={() =>
            setFormValues({
              ...formValues,
              shoemakerProtocol: !formValues.shoemakerProtocol,
            })
          }
        />
      </div>
      <div className={styles.formRow}></div>
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
      <button className={styles.formBtn} type="submit" disabled={sending}>
        <span style={merriweather.style} className={styles.formBtnText}>
          {sending ? "Sending..." : "Add Listing"}
        </span>
      </button>
    </form>
  );
}
