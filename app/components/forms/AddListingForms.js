"use client";

import { useState } from "react";

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

export default function AddListingForms() {
  const [displayForm, setDisplayForm] = useState("doctorForm");

  return (
    <>
      <h1>Add a Listing to the Directory</h1>
      <div className={styles.addListingFormSelectionContainer}>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("doctorForm")}
        >
          Practitioners
        </button>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("inspectorForm")}
        >
          Inspectors
        </button>
        <button
          className={styles.addListingSelector}
          onClick={() => setDisplayForm("remediatorForm")}
        >
          Remediators
        </button>
      </div>

      {displayForm === "doctorForm" && <AddDoctorForm />}
      {displayForm === "inspectorForm" && <AddInspectorForm />}
      {displayForm === "remediatorForm" && <AddRemediatorForm />}
    </>
  );
}
