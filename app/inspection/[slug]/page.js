// Images
import Image from "next/image";
import inspection1 from "../../../public/inspection1.png";

// Database
import { prisma } from "../../lib/prisma";

// Components
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import SingleListingStarRatings from "../../components/directories/SingleListingStarRatings";
import ListingReviews from "../../components/directories/ListingReviews";
import AddReviewForm from "../../components/forms/AddReviewForm";

// Helpers
import arrayToCommaString from "../../lib/arrayToCommaString";

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

  const inspectors = await prisma.inspector.findMany({
    where: {
      published: {
        equals: true,
      },
    },
  });

  // Then, get the slug field of each Doctor and map it. This will get passed as a params prop to the
  // SinglePractitionerPage function so nextjs can build a unique page for each doctor (by looking up
  // the unique slug)
  return inspectors.map((inspector) => ({
    slug: inspector.slug,
  }));
}

// SEO: generate dynamic metadata
export async function generateMetadata({ params }) {
  const inspector = await prisma.inspector.findUnique({
    where: {
      slug: params.slug,
    },
  });

  let {
    companyName: companyName,
    addressCity: city,
    addressState: stateName,
  } = inspector;

  return {
    title:
      companyName + " | Mold Illness Treatment in " + city + ", " + stateName,
  };
}

export default async function SingleInspectorPage({ params }) {
  // Get the slug from the params generated in generateStaticParams()
  const slug = params.slug;

  // Find the unique doctor in the database
  const inspector = await prisma.inspector.findUnique({
    where: {
      slug: slug,
    },
  });

  // Destructure the object to make the names more manageable
  let {
    id: id,
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
    certifications: certifications,
  } = inspector;

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.singleListingHero}>
        <Image
          src={inspection1}
          className={styles.img}
          // TO DO: update to make auto-generated alt tag
          alt="Inspector photo."
        />

        <div className={styles.textBox}>
          <span className={styles.doctorName}>{companyName}</span>
          <SingleListingStarRatings inspectorId={id} />

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

      {/* Inspector Info */}
      <div className={styles.singeListingInfoContainer}>
        <h3>About this Inspector</h3>
        {bio &&
          bio.map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}

        <h3>Certifications</h3>
        <p>{certifications && arrayToCommaString(certifications)}</p>
      </div>

      {/* Reviews */}
      <ListingReviews id={id} listingType="inspector" />

      <AddReviewForm inspectorId={id} />

      <Footer />
    </main>
  );
}
