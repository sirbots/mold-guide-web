// Images
import Image from "next/image";
import maleDoctor2 from "../../../public/male-doctor2.png";
import femaleDoctor6 from "../../../public/female-doctor6.png";

// Database
import { prisma } from "../../lib/prisma";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarRatings from "../../components/StarRatings";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";
import formatMiddleName from "../../lib/formatMiddleName";

// Styles & Fonts
import styles from "../../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // First, get all of the documents in the Doctor collection of the database so we can create a page for each one

  const practitioners = await prisma.doctor.findMany({
    where: {
      published: {
        equals: true,
      },
    },
  });

  // Then, get the slug field of each Doctor and map it. This will get passed as a params prop to the
  // SinglePractitionerPage function so nextjs can build a unique page for each doctor (by looking up
  // the unique slug)
  return practitioners.map((doc) => ({
    slug: doc.slug,
  }));
}

// SEO: generate dynamic metadata
export async function generateMetadata({ params }) {
  const doctor = await prisma.doctor.findUnique({
    where: {
      slug: params.slug,
    },
  });

  let {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    addressCity: city,
    addressState: stateName,
  } = doctor;

  return {
    title:
      firstName +
      " " +
      formatMiddleName(middleName) +
      " " +
      lastName +
      " | Mold Illness Treatment in " +
      city +
      ", " +
      stateName,
  };
}

export default async function SinglePractitionerPage({ params }) {
  // Get the slug from the params generated in generateStaticParams()
  const slug = params.slug;

  // Find the unique doctor in the database
  const doctor = await prisma.doctor.findUnique({
    where: {
      slug: slug,
    },
  });

  // Destructure the object to make the names more manageable
  let {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    gender: gender,
    addressStreet: street,
    addressUnit: unitNum,
    addressCity: city,
    adddressState: stateName,
    addressZipcode: zipcode,
    addressCountry: country,
    website: website,
    phoneNumber: phoneNumber,
    bio: bio,
    practiceName: practiceName,
    telehealth: telehealth,
    shoemakerProtocol: shoemakerProtocol,
    certifications: certifications,
    seesPatientsIn: seesPatientsIn,
    conditionsTreated: conditionsTreated,
  } = doctor;

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.singleListingHero}>
        <Image
          src={gender == "male" ? maleDoctor2 : femaleDoctor6}
          className={styles.img}
          // TO DO: update to make auto-generated alt tag
          alt="Doctor photo."
        />

        <div className={styles.textBox}>
          <span className={styles.doctorName}>
            {firstName} {formatMiddleName(middleName)} {lastName}
          </span>
          <StarRatings doctorId={doctor.id} />

          <div className={styles.addressBox}>
            <span className={styles.streetAddress}>{street}</span>
            <span className={styles.unitNumber}>{unitNum}</span>
            <span className={styles.cityState}>
              {city ? city + ", " : ""} {stateName ? stateName : ""}
              {zipcode} {country}
            </span>
          </div>
          <span className={styles.phoneNumber}>{phoneNumber}</span>
          {website && (
            <a href={website} target="_blank" className={styles.website}>
              Website
            </a>
          )}
        </div>
      </div>

      {/* Doctor Info */}
      <div className={styles.singeListingInfoContainer}>
        <h2>About</h2>

        {bio &&
          bio.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}

        <h3>Practice Name</h3>
        <p>{practiceName}</p>

        <h3>Telehealth</h3>
        <p>
          {telehealth === null ? "Unknown" : telehealth === true ? "Yes" : "No"}
        </p>

        <h3>Can See Patients In</h3>
        <p>{seesPatientsIn && arrayToCommaString(seesPatientsIn)}</p>

        <h3>Conditions Treated</h3>
        {conditionsTreated &&
          conditionsTreated.map((condition) => {
            return <p key={condition}>{condition}</p>;
          })}

        <h3>Shoemaker Protocol?</h3>
        {shoemakerProtocol == true && <p>Yes</p>}
        {shoemakerProtocol == false && <p>No</p>}

        <h3>Certifications</h3>
        <p>{certifications && arrayToCommaString(certifications)}</p>
      </div>
      <Footer />
    </main>
  );
}
