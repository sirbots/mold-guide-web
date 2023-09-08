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

export default function AddDoctorForm() {
  let [sending, setSending] = useState(false);
  let [conditionsTreatedOtherDisabled, setConditionsTreatedOtherDisabled] =
    useState(true);
  let [certificationsOtherDisabled, setCertificationsOtherDisabled] =
    useState(true);

  let [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    practiceName: "",
    phoneNumber: "",
    website: "",
    addressStreet: "",
    addressUnit: "",
    addressCity: "",
    addressState: "",
    addressZipcode: "",
    addressCountry: "USA",
    telehealth: false, // Boolean
    shoemakerProtocol: false, // Boolean
    conditionsTreated: [], // Array
    certifications: [], // Array
    bio: [], // Array
    createdAt: new Date(),
    lastModified: new Date(),

    // These are in the form, but get merged with other fields or manipulated before being sent to the API
    conditionsTreatedOther: "", // String
    certificationsOther: "", // String
    seesPatientsIn: "", // Take input as a string, reformat as array before sending to API
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
    data["slug"] =
      `${formValues.firstName}-${formattedMiddleName}${formValues.lastName}-${formValues.addressCity}-${formValues.addressState}`.toLowerCase();

    // Add any "other" conditions treated to the conditionsTreated array. Delete the "other" field.
    data["conditionsTreated"] = [
      ...formValues.conditionsTreated,
      formValues.conditionsTreatedOther,
    ];
    delete data["conditionsTreatedOther"];

    // Add any "other" certifications to the certifications array. Delete the "other" field.
    data["certifications"] = [
      ...formValues.certifications,
      formValues.certificationsOther,
    ];
    delete data["certificationsOther"];

    // Handle the seesPatientsIn field. This won't be a perfect cleanup function, but it covers the basic cases.
    if (formValues.seesPatientsIn != "") {
      let seesPatientsInArray = formValues.seesPatientsIn
        .replaceAll(",", " ")
        .split(" ")
        .filter((item) => item != "");
      data["seesPatientsIn"] = seesPatientsInArray;
    } else {
      data["seesPatientsIn"] = [];
    }

    // Arrange bio into an array
    if (formValues.bio != "") {
      data["bio"] = formValues.bio.split("\n\n");
    }

    try {
      fetch("/api/doctors", {
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
            router.push("/add-listing/thank-you-doctor");
          }
        })
        .then(() => {
          // Send an email notification to let you know that a new doctor was submitted
          try {
            fetch("/api/email/content-submission-notification", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ formSubmitted: "Doctor Listing" }),
            });

            // Send an Umami event
            umami.track("Doctor Submitted");
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
        <h2 className={lora.className}>Add a Practitioner</h2>
        <p className={styles.formDescription}>
          Submit the form below to add a new practitioner to the directory.
          Fields marked with an asterisk (*) are required.
        </p>
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

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="telehealth">
            Telehealth offered?
          </label>
          <fieldset className={styles.multipleCheckboxSection}>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="telehealth"
                defaultChecked={false}
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    telehealth: !formValues.telehealth,
                  })
                }
              />
            </div>
          </fieldset>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="shoemakerProtocol">
            Shoemaker Protocol?
          </label>
          <fieldset className={styles.multipleCheckboxSection}>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkboxInput}
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
          </fieldset>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="conditionsTreated">
            Conditions Treated:
          </label>

          <fieldset className={styles.multipleCheckboxSection}>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Mold Illness
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Mold Illness"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "Mold Illness",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                CIRS
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="CIRS"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "CIRS",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Heavy Metals
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Heavy Metals"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "Heavy Metals",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Lyme Disease
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Lyme Disease"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "Lyme Disease",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Gut Issues
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Gut Issues"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "Gut Issues",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Thyroid Issues
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Thyroid Issues"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    conditionsTreated: [
                      ...formValues.conditionsTreated,
                      "Thyroid Issues",
                    ],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label
                className={styles.checkboxLabel}
                htmlFor="conditionsTreated"
              >
                Other
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="conditionsTreated"
                value="Other"
                onChange={() =>
                  setConditionsTreatedOtherDisabled(
                    !conditionsTreatedOtherDisabled
                  )
                }
              />
              <input
                className={styles.formInputOther}
                type="text"
                name="conditionsTreatedOther"
                value={formValues.conditionsTreatedOther}
                // This is set to invisible when disabled. Clicking the above checkbox will set disabled to false.
                disabled={conditionsTreatedOtherDisabled}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="certifications">
            Certifications:
          </label>

          <fieldset className={styles.multipleCheckboxSection}>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                MD
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="MD"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "MD"],
                  })
                }
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                DO
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="DO"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "DO"],
                  })
                }
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                L.Ac
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="L.Ac"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "L.Ac"],
                  })
                }
              />
            </div>
            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                ND
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="ND"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "ND"],
                  })
                }
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                NP
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="NP"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "NP"],
                  })
                }
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                RN
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="RN"
                onChange={() =>
                  setFormValues({
                    ...formValues,
                    certifications: [...formValues.certifications, "RN"],
                  })
                }
              />
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel} htmlFor="certifications">
                Other
              </label>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name="certifications"
                value="Other"
                onChange={() =>
                  setCertificationsOtherDisabled(!certificationsOtherDisabled)
                }
              />
              <input
                className={styles.formInputOther}
                type="text"
                name="certificationsOther"
                value={formValues.certificationsOther}
                // This is set to invisible when disabled. Clicking the above checkbox will set disabled to false.
                disabled={certificationsOtherDisabled}
                onChange={handleChange}
              />
            </div>
          </fieldset>
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
