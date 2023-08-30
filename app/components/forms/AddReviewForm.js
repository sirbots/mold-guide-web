"use client";

import { useState, cache, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Cache the user session data so we can send it to the API with the form data
const getUser = cache(() => fetch("/api/session/").then((res) => res.json()));

export default function AddReviewForm({ doctorId }) {
  let [reviewPublished, setPublished] = useState(false);
  let [sending, setSending] = useState(false);

  let [formValues, setFormValues] = useState({
    title: "Title your review", // String
    body: "Write something here...", // String
    rating: "3", // Int
  });

  // Initialize the router because redirect doesn't seem to work in client components
  const router = useRouter();

  // Get the user from the cache
  let user = use(getUser());
  // Get the user's ID
  let userId = user?.session?.user?.id;

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setSending(true);

    // Create a data object from the form values
    let data = formValues;

    /*
      Add necessary data to the data object 
    */
    // Convert the reviewRating to an int
    data["rating"] = parseInt(formValues.rating); // Convert the rating to an int
    data["createdAt"] = new Date(); // Set the createdAt date to the current date
    data["authorId"] = userId; // Set the authorId to the currently logged-in user
    data["doctorId"] = doctorId; // Set the doctorId to the doctorId of the current page

    // console.log("The formatted data object:");
    // console.log(data);
    try {
      fetch("/api/reviews", {
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
          alert(
            "Ooops. Received an error with this message: " +
              res.statusText +
              "\n\nPlease contact us for help."
          );
        }
        // Display a success message if successful
        if (res.ok) {
          setPublished(true);
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

  // If the user is not logged in, display a message telling them to sign in or register in order to leave a review
  if (user.status === "fail") {
    return (
      <div className={styles.addReviewSubmitted}>
        <h3 className={styles.addReviewTitle}>
          Leave a Review of this Practitioner
        </h3>
        <p
          style={{
            marginTop: "15px",
            padding: "0 8%",
          }}
        >
          You need to <a href="/api/auth/signin">sign in</a> to your account
          before you can leave a review. If you don&rsquo;t have an account yet,
          you can <a href="/signup">register here</a>.
        </p>
      </div>
    );
  }

  if (reviewPublished === false) {
    return (
      // Has an id so the Add Review button can link to this location on the page
      <form
        id="review-form"
        className={styles.addReviewForm}
        onSubmit={handleSubmit}
      >
        <h3 className={styles.addReviewTitle}>
          Leave a Review of this Practitioner
        </h3>

        <p className={styles.addReviewP}>
          Try to leave a review that provides helpful information for others who
          are looking for help.
        </p>
        <p className={styles.addReviewP}>
          What did you see this practitioner for? What Were they able to
          successfully diagnose and treat your issue? Were they transparent
          about their prices? Would you recommend them to a friend suffering
          from a similar condition?
        </p>
        <p className={styles.addReviewP}></p>

        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="title">
            Title
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="body">
            Your Review
          </label>
          <textarea
            className={styles.formInputTextArea}
            type="text"
            name="body"
            value={formValues.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="rating">
            Rating: {formValues.rating}
          </label>
          <input
            className={styles.formInput}
            type="range"
            min="0"
            max="5"
            step="1"
            name="rating"
            value={formValues.rating}
            onChange={handleChange}
            list="rating-markers"
            required
          />
          <datalist id="rating-markers">
            <option value="0" label="0"></option>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
            <option value="4" label="4"></option>
            <option value="5" label="5"></option>
          </datalist>
        </div>

        <button className={styles.formBtn} type="submit" disabled={sending}>
          <span style={merriweather.style} className={styles.formBtnText}>
            {sending ? "Sending..." : "Add Review"}
          </span>
        </button>
      </form>
    );
  } else if (reviewPublished == true) {
    return (
      <div className={styles.addReviewSubmitted}>
        <p>
          Thank you! Your reviews help other people make informed decisions.
        </p>
      </div>
    );
  }
}
