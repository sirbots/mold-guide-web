import { Suspense } from "react";

// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import WideImage from "../components/WideImage";
import Footer from "../components/Footer";
import DirectoryListings from "../components/DirectoryListings";

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
  title: "Find Mold Doctors and Treatment",
};

export default async function PractitionerListingsPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        orientation="left"
        headline="Find Mold Doctors and Practitioners Near You"
        subHead="Finding a trained medical practitioner is essential to diagnosis & treatment."
        // useBtn
        // btnLink=""
        // buttonText=""
      />
      <WideImage backgroundImage="doctor-patient1" />
      {/* Page Content */}
      <div className={styles.directoryPage}>
        <h2 className={lora.className}>Browse Doctors</h2>
        <DirectoryListings directoryType="doctors" />
      </div>

      <Footer />
    </main>
  );
}
