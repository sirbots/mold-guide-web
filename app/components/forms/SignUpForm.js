"use client";
// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function SignUpForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refrehsing the page.
    event.preventDefault();
    console.log("Submitting the form... (not really)");
  };

  return (
    <form className={styles.signUpForm} action="/send-data-here" method="post">
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="first">
          First name:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="firstName"
          name="firstName"
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="last">
          Last name:
        </label>
        <input
          className={styles.formInput}
          type="text"
          id="lastName"
          name="lastName"
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="last">
          Email:
        </label>
        <input
          className={styles.formInput}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="last">
          Password:
        </label>
        <input
          className={styles.formInput}
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <button className={styles.formBtn} type="submit">
        <span style={merriweather.style} className={styles.formBtnText}>
          Sign Up
        </span>
      </button>
    </form>
  );
}
