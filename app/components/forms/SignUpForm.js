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

export default function SignUpForm() {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="name">
          Name:
        </label>
        <input
          className={styles.formInput}
          type="text"
          // id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.formInput}
          type="email"
          // id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formLabel} htmlFor="password">
          Password:
        </label>
        <input
          className={styles.formInput}
          type="password"
          // id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className={styles.formBtn} type="submit" disabled={loading}>
        <span style={merriweather.style} className={styles.formBtnText}>
          {loading ? "Loading..." : "Sign Up"}
        </span>
      </button>
    </form>
  );
}
