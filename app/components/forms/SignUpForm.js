"use client";

// Auth
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Styles & Fonts
import styles from "./forms.module.css";
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

  // Used to redirect the user after successful registration.
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    setLoading(true);

    try {
      const registerRes = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!registerRes.ok) {
        alert((await res.json()).message);
        return;
      }

      // Send an Umami event
      umami.track("Registration");

      // Sign the user in
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      // If the user signs in successfully, redirect to the profile page.
      if (!signInRes?.error) {
        // Send an Umami event
        umami.track("Login");

        if (document.referrer.includes("/login") || document.referrer == "") {
          // If the user is coming from the /login page, or there is no document.referrer, redirect them to the /profile page
          router.push("/profile");
        } else {
          // Send the user back to the previous page (e.g. if they clicked the "sign in" link from a doctor page)
          router.push(document.referrer);
        }
      }
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
          Display Name:
        </label>
        <input
          className={styles.formInput}
          type="text"
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
