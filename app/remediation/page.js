import { Suspense } from "react";

// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import WideImage from "../components/layout/WideImage";
import Footer from "../components/layout/Footer";
import RemediatorListings from "../components/directories/RemediatorListings";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Mold Remediation and Removal Services",
};

export default async function RemediationListingsPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        orientation="left"
        headline="Find Mold Remediation Companies Near You"
        subHead="Professional mold removal requires specialized service."
        // useBtn
        // btnLink=""
        // buttonText=""
      />
      <WideImage backgroundImage="doctor-patient1" />
      {/* Page Content */}
      <div className={styles.directoryPage}>
        <h2 className={lora.className}>Browse Remediation Companies</h2>
        <RemediatorListings />
      </div>

      <Footer />
    </main>
  );
}
