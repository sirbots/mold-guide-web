"use client";

// Auth
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        if (document.referrer !== "") {
          // Send the user back to the previous page (e.g. if they clicked the "sign in" link from a doctor page)
          router.push(document.referrer);
        } else {
          router.push(callbackUrl);
        }
      } else {
        console.log(error);
        setError(res.error);
        setError("invalid email or password");
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
