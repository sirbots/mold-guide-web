// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import WideImage from "../components/layout/WideImage";
import Footer from "../components/layout/Footer";
import InspectorListings from "../components/directories/InspectorListings";

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
  title: "Mold Inspectors and Inspection Services",
};

export default async function InspectorListingsPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        orientation="left"
        headline="Find Mold Inspectors Near You"
        subHead="Get professional help with identifying mold in your home."
        // useBtn
        // btnLink=""
        // buttonText=""
      />
      <WideImage backgroundImage="inspection2" />
      {/* Page Content */}
      <div className={styles.directoryPage}>
        <h2 className={lora.className}>Browse Inspectors</h2>
        <InspectorListings />
      </div>

      <Footer />
    </main>
  );
}
