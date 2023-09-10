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

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Used to redirect the user after successful login.
  const router = useRouter();

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      if (!res?.error) {
        // Send an Umami event
        umami.track("Login");

        if (document.referrer !== "") {
          // Send the user back to the previous page (e.g. if they clicked the "sign in" link from a doctor page)
          router.push(document.referrer);
        } else {
          // If there's no document.referrer, send the user to the homepage.
          router.push("/");
        }
      } else {
        console.log(error);
        setError(res.error);
        setError("invalid email or password");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  if (!loading) {
    return (
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.formLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.formInput}
            type="email"
            id="email"
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
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.formBtn} type="submit" disabled={loading}>
          <span style={merriweather.style} className={styles.formBtnText}>
            {loading ? "Loading..." : "Log In"}
          </span>
        </button>
      </form>
    );
  }
}
