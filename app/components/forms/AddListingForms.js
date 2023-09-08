"use client";

import { useState, useEffect, useRef } from "react";
// Components
import AddDoctorForm from "./AddDoctorForm";
import AddInspectorForm from "./AddInspectorForm";
import AddRemediatorForm from "./AddRemediatorForm";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// Animation
import autoAnimate from "@formkit/auto-animate";

export default function AddListingForms() {
  const [displayForm, setDisplayForm] = useState("doctorForm");

  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  return (
    <>
      <h1>Add a Listing to the Directory</h1>
      <div className={styles.addListingFormSelectionContainer}>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("doctorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Practitioners"
        >
          Practitioners
        </button>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("inspectorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Inspectors"
        >
          Inspectors
        </button>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("remediatorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Remediators"
        >
          Remediators
        </button>
      </div>

      <div className={styles.transitionGroup} ref={parentRef}>
        {displayForm === "doctorForm" && <AddDoctorForm />}

        {displayForm === "inspectorForm" && <AddInspectorForm />}

        {displayForm === "remediatorForm" && <AddRemediatorForm />}
      </div>
    </>
  );
}
