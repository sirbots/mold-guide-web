import Image from "next/image";
import styles from "../page.module.css";
import { Lora } from "next/font/google";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        imageSource="doctorPatient3"
        orientation="left"
        headline="Mold Recovery Made Simple"
        subHead=""
        // useBtn
        btnLinkToScreen="Doctors"
        buttonText="Find Doctors"
      />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>Page Headline</h2>
        <p>Page content.</p>
      </div>
    </main>
  );
}
