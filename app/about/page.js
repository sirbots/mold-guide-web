import Image from "next/image";

// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import WideImage from "../components/layout/WideImage";
import Footer from "../components/layout/Footer";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// SEO
export const metadata = {
  title: "About The Mold Guide",
};

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        // orientation="left"
        headline="About"
        subHead=""
        // useBtn
        // btnLink="/practitioners"
        // buttonText="Find Doctors"
      />

      <WideImage backgroundImage="inspection1" />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}></h2>

        <h3>My Story</h3>
        <p>
          In 2021, after years of struggling with an unknown chronic illness, I
          finally found a doctor who gave me a mycotoxin test. Turns out, I had
          been exposed to mold and it was wreaking havoc on my body and my mind.
        </p>
        <p>
          Luckily, I had a friend who had just found mold in her apartment and
          she referred me to a great inspector. He found Chaetomium growing in
          my kitchen cabinets, out of view.
        </p>
        <p>Over the next four months, I went through a whirlwind of stress.</p>
        <p>
          I had to find a new apartment. I had to move. I had to get rid of just
          about everything I owned. All of this while still sick, anxious, and
          very constantly fatigued.
        </p>
        <p>
          And the crazy thing was that the treatment was actually really simple
          -- the hard part was finding a doctor who knew to look for it!
        </p>

        <h3>
          Why is it so hard to find a doctor who understands mold illness?
        </h3>
        <p>
          Sadly, finding a doctor who will even look for or think of mold, is
          incredibly difficult. I&rsquo;ve seen doctors who flat out deny that
          it&rsquo;s a problem, while others run some tests and say
          &quot;you&rsquo;re fine.&quot;
        </p>
        <p>
          And it&rsquo;s not just mainstream MDs -- I&rsquo;ve seen many
          holistic, naturopathic, and functional medicine practitioners who
          missed the diagnosis because they didn&rsquo;t test for it.
        </p>
        <p>
          I left those appointments frustrated, depressed, and holding a
          prescription (or a bag of supplements) for something totally
          unrelated.
        </p>
        <p>Perhaps you&rsquo;ve had a similar experience?</p>

        <p>
          Here&rsquo;s a quick story that illustrates just how broken our
          medical system is. I once met a woman whose doctors thought she had
          dementia (!) in her early 30s. Her life had completely fallen apart.
          She lost her job, her business, and even her ability to drive. She had
          been to dozens of doctors who couldn&rsquo;t help her until...
        </p>

        <p>
          One day, she brought her sick dog to the vet, who found mold spores in
          her dog&rsquo;s lungs. She had her home inspected for mold and found a
          huge patch of toxic mold growing in the ceiling over her bed.
        </p>

        <p>
          The thing is, we know that mold is harmful. There&rsquo;s plenty of
          published medical research to support this.
        </p>
        <p>
          It can cause everything from minor allergies to autoimmune disease to
          impaired childhood development to cancer, although each person reacts
          slightly differently, depending on their immune system, genetics, and
          the strain of mold.
        </p>

        <h3>Diagnosis is just the first step</h3>

        <p>
          In many ways, I got lucky. It took a long time, but I found a great
          doctor. I found a great inspector because I happened to have a friend
          who referred me.
        </p>
        <p>
          But even then, I had to spend hours researching how to remediate it,
          how to remove it from my belongings, and how to prevent it. And I made
          a lot of mistakes along the way.
        </p>
        <p>
          I&rsquo;m building this site with the hope of creating something that
          would&rsquo;ve made this whole process much easier for me when I first
          started feeling sick.
        </p>
        <p>
          It&rsquo;s new and it&rsquo;s a work in progress. I&rsquo;m building
          it in my free time, bit by bit, with the hope that some day it grows
          into a place where people can find the help they need along every step
          of the way.
        </p>
        <p>
          Soon, it will be interactive and you&rsquo;ll have the ability to
          share great resources with others, leave ratings and reviews, and get
          essential information on identifying mold and removing it from your
          environment.
        </p>
        <p>
          I&rsquo;m not a doctor and this isn&rsquo;t medical advice, but
          I&rsquo;ve seen many people recover from old illness and get their
          lives back. Wherever you are in your mold journey, know that
          you&rsquo;re not alone, and there is hope that you can reverse all
          those crazy symptoms.
        </p>
        <p>-- Robert</p>
      </div>
      <Footer />
    </main>
  );
}
