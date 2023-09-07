// Images
import Image from "next/image";
import remediation1 from "../../../public/remediation1.png";

// Database
import { prisma } from "../../lib/prisma";

// Components
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SingleListingStarRatings from "../../components/directories/SingleListingStarRatings";
import RemediatorReviews from "../../components/directories/RemediatorReviews";
import AddReviewForm from "../../components/forms/AddReviewForm";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";
import formatMiddleName from "../../lib/formatMiddleName";
// import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter";

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
  // First, get all of the documents in the Remediation collection of the database so we can create a page for each one

  const remediators = await prisma.remediator.findMany({
    where: {
      published: {
        equals: true,
      },
    },
  });

  // Then, get the slug field of each Remediator and map it. This will get passed as a params prop to the
  // SinglePractitionerPage function so nextjs can build a unique page for each remediator (by looking up
  // the unique slug)
  return remediators.map((doc) => ({
    slug: doc.slug,
  }));
}

// SEO: generate dynamic metadata
export async function generateMetadata({ params }) {
  const remediator = await prisma.remediation.findUnique({
    where: {
      slug: params.slug,
    },
  });

  let {
    // firstName: firstName,
    // middleName: middleName,
    // lastName: lastName,
    addressCity: city,
    addressState: stateName,
  } = remediator;

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

  // Find the unique remediator in the database
  const remediator = await prisma.remediator.findUnique({
    where: {
      slug: slug,
    },
  });

  // Destructure the object to make the names more manageable
  let {
    id: id,
    // firstName: firstName,
    // middleName: middleName,
    // lastName: lastName,
    // gender: gender,
    companyName: companyName,
    addressStreet: street,
    addressUnit: unitNum,
    addressCity: city,
    addressState: stateName,
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
  } = remediator;

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.singleListingHero}>
        <Image
          src={remediation1}
          className={styles.img}
          // TO DO: update to make auto-generated alt tag
          alt="Remediator photo."
        />

        <div className={styles.textBox}>
          <span className={styles.name}>{companyName}</span>

          <SingleListingStarRatings listingId={id} listingType="remediator" />

          <a className={styles.addReviewBtn} href={"#review-form"}>
            <span className={styles.addReviewBtnTxt}>Add a Review</span>
          </a>

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

      {/* Remediator Info */}
      <div className={styles.singleListingInfoContainer}>
        <h3>Practice Name</h3>
        <p>{companyName}</p>

        <h3>About the Remediation Company</h3>
        {bio &&
          bio.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}

        <h3>Conditions Treated</h3>
        {conditionsTreated &&
          conditionsTreated.map((condition) => {
            return <p key={condition}>{condition}</p>;
          })}

        <h3>Certifications</h3>
        <p>{certifications && arrayToCommaString(certifications)}</p>
      </div>

      {/* Reviews */}
      <RemediatorReviews remediatorId={id} />
      <AddReviewForm remediatorId={id} />

      <Footer />
    </main>
  );
}
