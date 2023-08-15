// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import WideImage from "../components/WideImage";
import Footer from "../components/Footer";
import DirectoryListings from "../components/DirectoryListings";

// Helpers
import getAvgRating from "../lib/getAvgRating";

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

// Database
import { prisma } from "../lib/prisma";

let practitioners = await getPractitioners();

async function getPractitioners() {
  const rawObject = await prisma.doctor.findMany();
  // const objectWithRatings = {};
  rawObject.forEach(async (practitioner) => {
    // objectWithRatings[practitioner];
    practitioner["testField"] = "test";
    // const avgRating = await getAvgRating(practitioner.id);

    // left off here. I'm close! I got it to add the testField to the object,
    // but I can't get it to add the avgRating. so first, delete the avgRating thing from the DB entries.
    // and then try just adding a static number. and then get the rating using the getAvgRating() function
    // you might have to like chain things with a .then() statement -- maybe read up on those here: https://javascript.info/async-await
    const avgRating = 5;
    practitioner["avgRating"] = avgRating;
  });
  return rawObject;
}

getPractitioners();

// const addRatings = async (practitioners) => {
//   practitioners.forEach((practitioner) => {
//     // get the doctor Id and use it to call for their average rating
//     // const practitionerRating = await getAvgRating(practitioner.id);

//     // add the rating to the practitioner object
//     // practitioners.avgRating = practitionerRating;

//     practitionersWithRatings[practitioner];
//     practitionersWithRatings[practitioner].testField = "test";

//     // practitioner.testField = "test";
//   });
// };

// go through the practioners object. for each one, get their id and then use it to look up any
// reviews they have. then, push their avgRating into the practitioner object. then in the DirectoryListings
// component, pull in the avgRating and use it to generate the stars

export default function PractitionerListingsPage() {
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

        <DirectoryListings
          directoryType="doctors"
          listingsObject={practitioners}
        />
      </div>
      <Footer />
    </main>
  );
}
