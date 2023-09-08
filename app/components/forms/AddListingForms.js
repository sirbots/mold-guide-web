"use client";

import { useState, useEffect, useRef } from "react";
// Components
import AddDoctorForm from "./AddDoctorForm";
import AddInspectorForm from "./AddInspectorForm";
import AddRemediatorForm from "./AddRemediatorForm";

// Styles & Fonts
import formStyles from "./forms.module.css";
import pageStyles from "../../page.module.css";
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
      <h1 data-test="add-listing-headline">Add a Listing to the Directory</h1>
      <div className={formStyles.addListingFormSelectionContainer}>
        <button
          className={formStyles.addListingSelector}
          onClick={() => setDisplayForm("doctorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Practitioners"
          data-test="add-listing-doctor-btn"
        >
          Practitioners
        </button>
        <button
          className={formStyles.addListingSelector}
          onClick={() => setDisplayForm("inspectorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Inspectors"
          data-test="add-listing-inspector-btn"
        >
          Inspectors
        </button>
        <button
          className={formStyles.addListingSelector}
          onClick={() => setDisplayForm("remediatorForm")}
          data-umami-event="Change Add Listing Form"
          data-umami-event-form="Remediators"
          data-test="add-listing-remediator-btn"
        >
          Remediators
        </button>
      </div>

      <div className={pageStyles.transitionGroup} ref={parentRef}>
        {displayForm === "doctorForm" && <AddDoctorForm />}
        {displayForm === "inspectorForm" && <AddInspectorForm />}
        {displayForm === "remediatorForm" && <AddRemediatorForm />}
      </div>
    </>
  );
}
