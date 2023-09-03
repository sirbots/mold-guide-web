// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import WideImage from "../components/WideImage";
import ArticleLinks from "../components/resources/ArticleLinks";

// SEO
export const metadata = {
  title: "Mold Resources",
};

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export default function ResourcesPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        orientation="left"
        headline="Mold Resources"
        subHead="Learn more about mold identification, remediation, and treatment."
        // useBtn
        // btnLink=""
        // buttonText=""
      />
      <WideImage backgroundImage="doctor-patient1" />
      {/* Page Content */}
      <div className={styles.resourcesPage}>
        <ArticleLinks />
      </div>
      <Footer />
    </main>
  );
}
