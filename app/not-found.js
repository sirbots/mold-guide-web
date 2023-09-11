import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import WideImage from "./components/layout/WideImage";
import Footer from "./components/layout/Footer";

// Styles & Fonts
import styles from "./page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export const metadata = {
  title: "404 - Page not found",
};

export default function Custom404() {
  return (
    <main className={styles.container}>
      <Header />
      <div style={{ marginTop: "40px" }}></div>
      <WideImage backgroundImage="doctor-patient3" />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Page not found 😞</h2>
        <p style={{ textAlign: "center" }}>
          Try going <a href="/">home</a>.
        </p>
      </div>
      <Footer />
    </main>
  );
}
