// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
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

export default function PractitionerListingsPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        imageSource="doctorPatient3"
        orientation="left"
        headline="Find a Mold Doctor Near You"
        subHead=""
        // useBtn
        btnLinkToScreen=""
        buttonText=""
      />

      {/* Page Content */}
      <div className={styles.directoryPage}>
        <h2 className={lora.className}>Find Mold Doctors & Practitioners</h2>

        <DirectoryListings />
      </div>
      <Footer />
    </main>
  );
}
