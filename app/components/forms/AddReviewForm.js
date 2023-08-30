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

export default function AddReviewForm() {
  let [sending, setSending] = useState(false);
  // let [telehealthChecked, setTelehealthChecked] = useState(false);
  let [formValues, setFormValues] = useState({
    reviewTitle: "", // String
    reviewBody: "", // String
    reviewRating: 0, // Int

    reviewAuthor: "", // This should pull in the currently logged-in user
    // author    User     @relation(fields: [authorId], references: [id])
    // authorId  String   @db.ObjectId

    reviewDoctor: "", // This should pull in the doctor that the review is for
    // Doctor    Doctor?  @relation(fields: [doctorId], references: [id])
    // doctorId  String
    reviewCreatedAt: new Date(),
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
      }).then(async (res) => {
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
    // Has an id so the Add Review button can link to this location on the page

    <form
      id="review-form"
      className={styles.addReviewForm}
      onSubmit={handleSubmit}
    >
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="reviewTitle">
          Title
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="reviewTitle"
          value={formValues.reviewTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="reviewBody">
          Your Review
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="reviewBody"
          value={formValues.reviewBody}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="reviewRating">
          Rating
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="reviewRating"
          value={formValues.reviewRating}
          onChange={handleChange}
          required
        />
      </div>

      <button className={styles.formBtn} type="submit" disabled={sending}>
        <span style={merriweather.style} className={styles.formBtnText}>
          {sending ? "Sending..." : "Add Review"}
        </span>
      </button>
    </form>
  );
}
