"use client";

// Auth
import { useEffect, useState, useRef } from "react";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Animation
import autoAnimate from "@formkit/auto-animate";

export default function FeedbackForm() {
  const [cookieExists, setCookieExists] = useState(true);
  const [formStatus, setStatus] = useState("hidden");
  const [formValues, setFormValues] = useState({
    feedbackMessage: "",
    email: "",
  });

  const parentRef = useRef(null);

  // Handles the submit event on form submit.
  const handleSubmit = async (e) => {
    // Stop the form from submitting and refrehsing the page.
    e.preventDefault();
    try {
      setCookie();
      setStatus("submitted");
      await fetch("/api/email/feedback-notification", {
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
    setCookie();
  };

  const getCookieValue = () => {
    const cookiesArray = document.cookie.split("; ");
    const cookieExists = cookiesArray.find((item) =>
      item.startsWith("moldguidefeedbackform=")
    );

    // If the cookie isn't there...
    if (!cookieExists) setCookieExists(false);

    // If the cookie is there...
    if (!!cookieExists) setCookieExists(true);
  };

  const setCookie = () => {
    const dateNow = new Date();
    const dataNowMs = dateNow.getTime();
    const dateIn14Days = new Date(dataNowMs + 14 * 24 * 60 * 60 * 1000);

    // Format the cookie string
    let cookieString =
      "moldguidefeedbackform=hidden; expires=" +
      dateIn14Days.toUTCString() +
      "; path=/;SameSite:Strict";

    // Set the cookie in the browser
    document.cookie = cookieString;
  };

  // run this logic on component mount
  useEffect(() => {
    try {
      // Check to see if the cookie has been set
      getCookieValue();

      // If there's no cookie, then start a timer to show the form
      if (!cookieExists) {
        setTimeout(() => {
          setStatus("visible");
        }, 15_000);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cookieExists]);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  return (
    <div ref={parentRef}>
      {formStatus === "hidden" && null}
      {formStatus === "submitted" && (
        <div className={styles.giveFeedbackFormModal}>
          <p className={styles.thankYouMsg}>Thank you for your feedback 🙏🏼</p>
        </div>
      )}
      {formStatus === "visible" && (
        <div ref={parentRef} className={styles.giveFeedbackFormModal}>
          <form className={styles.giveFeedbackForm} onSubmit={handleSubmit}>
            <button className={styles.xButton} onClick={() => hideForm()}>
              X
            </button>
            <h3>Give Feedback</h3>
            <p>Anything we could do to improve the site?</p>
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
      )}
    </div>
  );
}
