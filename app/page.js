// Images
import Image from "next/image";
import doctorPatient1 from "../public/doctor-patient1.png";
import community3 from "../public/community3.png";
import recovery3 from "../public/recovery3.png";
import inspection2 from "../public/inspection2.png";
import remediation3 from "../public/remediation3.png";
import cleaning1 from "../public/cleaning1.png";

// Components
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
  title: "The Mold Guide: Resources for Surviving Mold Illness",
  verification: {
    google: "AMiM3LHsmUCVLAhP6EZWi4yCMBRNGlBa1_eY0cKnBnA",
  },
};

const StepComponent = ({
  number,
  title,
  imageSource,
  copy,
  buttonCopy,
  buttonLink,
  showButton = false,
}) => {
  return (
    <>
      <div className={styles.stepBox}>
        <Image src={imageSource} className={styles.stepImg} alt={buttonCopy} />
        <h3>
          Step {number}: {title}
        </h3>
        <p>{copy}</p>
        {showButton ? (
          <a className={styles.stepBtn} href={buttonLink}>
            <span className={styles.stepBtnText}>{buttonCopy}</span>
          </a>
        ) : (
          <a className={styles.stepBtn} href="#">
            <span className={styles.stepBtnText}>Coming Soon</span>
          </a>
        )}
      </div>
    </>
  );
};

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        headline="Mold Recovery Made Simple"
        subHead="Resources to help you conquer mold, one step at a time."
        useBtn
        btnLink="/practitioners"
        buttonText="Find Doctors"
      />

      <WideImage backgroundImage="doctor-patient3" />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>Do You Have a Mold Problem?</h2>

        <div className={styles.introContent}>
          <p>
            Mold illness is often a long and difficult journey. If you think you
            might have a mold problem, you can read about{" "}
            <a href="/resources/articles/symptoms-of-mold-illness">
              the most common symptoms of mold illness
            </a>
            .
          </p>

          <p>
            For some, the process of detox and healing is a long one, and for
            others, it&rsquo;s just a matter of eliminating the source of the
            mold.
          </p>
          <p>
            The goal of this site is to make the process easier by connecting
            you with professionals who can help you diagnose, remediate, and
            recover from mold illness.
          </p>
        </div>

        <div className={styles.stepContainer} data-test="steps-container">
          <h2 style={{ fontSize: "24px" }}>A 4-step Path to Recovery</h2>
          <StepComponent
            number="1"
            title="Diagnose Your Illness"
            copy="Many of the symptoms of mold illness are shared by other diseases, so it&rsquo;s important to work with a doctor who can accurately
              diagnose you."
            buttonCopy="Find Doctors"
            buttonLink="/practitioners"
            imageSource={doctorPatient1}
            showButton
          />
          <StepComponent
            number="2"
            title="Find the Source"
            copy="Locating the source of your exposure is important so you can understand the severity of the problem."
            buttonCopy="Find Inspectors"
            buttonLink="/inspection"
            imageSource={inspection2}
            showButton
          />
          <StepComponent
            number="3"
            title="Remediate or Move"
            copy="Depending on your situation, you may need to move to a new home or hire professionals to remediate the contaminated area."
            buttonCopy="Find Remediators"
            buttonLink="/remediation"
            imageSource={remediation3}
            showButton
          />
          {/* TO DO: Add content for cleaning and enable this step */}
          {/* <StepComponent
            number="4"
            title="Clean Your Belongings"
            copy="In some cases, it may be necessary to sanitize or discard personal items to avoid triggering your symptoms."
            buttonCopy="Clean Up"
            // TO DO: link this to /resources/cleaning
            buttonLink="/cleaning"
            imageSource={cleaning1}
          /> */}
          <StepComponent
            number="4"
            title="Detox & Heal"
            copy="Once you&rsquo;ve eliminated your exposure to mold, it&rsquo;s time for your body to heal and recover."
            buttonCopy="Find Doctors"
            buttonLink="/practitioners"
            imageSource={recovery3}
            showButton
          />
          {/* TO DO: Add content for support and enable this step */}
          {/* <StepComponent
            number="6"
            title="Get Support"
            copy="It&rsquo;s important to get help from others to get through this -- either from your friends and family or an online community on the same journey as you."
            buttonCopy="Join The Community"
            buttonLink="/community"
            imageSource={community3}
          /> */}
        </div>
      </div>
      <Footer />
    </main>
  );
}
