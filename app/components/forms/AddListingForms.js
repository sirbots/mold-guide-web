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

  console.log("displayForm", displayForm);
  return (
    <>
      <div>
        <h1>Add a Listing to the Directory</h1>
        <button onClick={() => setDisplayForm("doctorForm")}>
          Add a Doctor
        </button>
        <button onClick={() => setDisplayForm("inspectorForm")}>
          Add an Inspector
        </button>
        <button onClick={() => setDisplayForm("remediatorForm")}>
          Add a Remediation Company
        </button>
      </div>

      {displayForm === "doctorForm" && <AddDoctorForm />}
      {displayForm === "inspectorForm" && <AddInspectorForm />}
      {displayForm === "remediatorForm" && <AddRemediatorForm />}
    </>
  );

  //   if (displayForm === "doctorForm") return <AddDoctorForm />;
  //   if (displayForm === "inspectorForm") return <AddInspectorForm />;
  //   if (displayForm === "remediatoreForm") return <AddRemediatorForm />;
}
