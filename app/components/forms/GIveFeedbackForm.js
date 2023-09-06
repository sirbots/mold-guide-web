"use client";

// Auth
import { useState } from "react";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function GiveFeedbackForm() {
  const [formStatus, setStatus] = useState("hidden");
  const [formValues, setFormValues] = useState({
    feedbackMessage: "",
    email: "",
  });

  const [error, setError] = useState("");

  // Wait x seconds before showing the form
  try {
    setTimeout(() => {
      setStatus("visible");
    }, 10_000);
  } catch (error) {
    console.log(error);
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    try {
      setStatus("submitted");
      fetch("/api/email/feedback-notification", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const hideForm = () => {
    setStatus("hidden");
  };

  if (formStatus === "hidden") return;

  if (formStatus === "submitted") {
    return (
      <div>
        <p>Thank you for your feedback 🙏🏼</p>
      </div>
    );
  }

  if (formStatus === "visible") {
    return (
      <div className={styles.giveFeedbackFormModal}>
        <form className={styles.giveFeedbackForm} onSubmit={handleSubmit}>
          <button className={styles.xButton} onClick={() => hideForm()}>
            X
          </button>
          <h3>Give Feedback</h3>
          <p style={{ fontSize: "14px" }}>
            Anything we could do to improve the site?
          </p>
          <div className={styles.formRow}>
            {/* <label className={styles.formLabel} htmlFor="feedbackMessage">
              Feedback:
            </label> */}
            <textarea
              className={styles.formInputTextArea}
              name="feedbackMessage"
              rows="7"
              value={formValues.feedbackMessage}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formRow}>
            <p style={{ fontSize: "14px" }}>Your email (optional):</p>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <button
            className={styles.formBtn}
            type="submit"
            disabled={formStatus === "submitted" ? true : false}
          >
            <span style={merriweather.style} className={styles.formBtnText}>
              Send
            </span>
          </button>
        </form>
      </div>
    );
  }
}
