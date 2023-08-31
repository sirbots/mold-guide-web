"use client";

// Auth
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";
import { UserGroupIcon } from "@heroicons/react/24/outline";

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

  // We may not need these. Copied over from LoginForm.js
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

      // Sign the user in
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      // If the user signs in successfully, redirect to the profile page.
      if (!signInRes?.error) {
        router.push("/profile");
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
