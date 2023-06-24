import Image from "next/image";
import styles from "./page.module.css";
import { Lora } from "next/font/google";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        imageSource="doctorPatient3"
        orientation="left"
        headline="Mold Recovery Made Simple"
        subHead=""
        useBtn
        btnLinkToScreen="Doctors"
        buttonText="Find Doctors"
      />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>Do You Have a Mold Problem?</h2>

        <p className={styles.text}>
          If you're here, then there's a good chance that you're not feeling
          great.
        </p>
        <p>
          You might feel sick or you might feel like your body and mind are
          falling apart. Mold illness can manifest in all sorts of strange and
          debilitating ways.
        </p>
        <p>
          Maybe you're plagued with anxiety and depression, chronic fatigue, or
          constant muscle and joint aches. Maybe you're coughing more or having
          trouble sleeping.
        </p>
        <p>
          Maybe you're suffering from brain fog, cognitive impairment, or memory
          loss. You're reacting to foods that never bothered you before or you
          developed eczema, psorisasis, or weird rashes.
        </p>
        <p>
          And worst of all, mold illness seems to just drain the joy out of
          life.
        </p>

        <div className={styles.steps}>
          <h2 style={lora.style}>Dealing with Mold, One Step at a Time</h2>

          <p>
            The good news is that it's possible to heal and restore your body.
            The bad news is that it's going to take more than a simple pill.
            Let's break it down.
          </p>
        </div>
      </div>
    </main>
  );
}
