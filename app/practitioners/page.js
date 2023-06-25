// images
import Image from "next/image";
import maleDoctor2 from "../../public/male-doctor2.png";
import femaleDoctor6 from "../../public/female-doctor6.png";

// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// Inline Components
const DoctorListing = ({
  id,
  firstName,
  middleName,
  lastName,
  gender,
  addressCity,
  addressState,
  certifications,
  website,
  profilePhoto,
}) => {
  return (
    <div className={styles.doctorListings.listing}>
      {/* Doctor Ratings */}
      {/* 
      <View style={styles.doctorListings.listing.starContainer}>
        <MaterialCommunityIcons
          name="star"
          size={24}
          style={styles.doctorListings.listing.star}
        />
        <MaterialCommunityIcons
          name="star-half-full"
          size={24}
          style={styles.doctorListings.listing.star}
        />
        <MaterialCommunityIcons
          name="star-outline"
          size={24}
          style={styles.doctorListings.listing.star}
        />
      </View>
       */}

      {middleName ? (
        <span style={styles.doctorListings.listing.doctorName}>
          {firstName + " " + middleName + " " + lastName}
        </span>
      ) : (
        <span style={styles.doctorListings.listing.doctorName}>
          {firstName + " " + lastName}
        </span>
      )}
      <span style={styles.doctorListings.listing.doctorLocation}>
        {addressCity ? addressCity + ", " : ""}{" "}
        {addressState ? addressState : ""}
      </span>

      {/* Doctor Photo */}
      {/* TO DO: Pull this in from Firestore */}
      <Image
        src={gender == "male" ? maleDoctor2 : femaleDoctor6}
        style={styles.doctorListings.listing.img}
        alt="Practitioner photo"
      />

      {/* Doctor Metadata */}
      <span style={styles.doctorListings.listing.doctorCertification}>
        {certifications ? arrayToCommaString(certifications) : " "}
      </span>

      {website ? (
        <a
          href={website}
          target="_blank"
          style={styles.doctorListings.listing.website}
        >
          Website
        </a>
      ) : (
        <a style={styles.doctorListings.listing.website}> </a>
      )}
      {/* Button */}
      <a className={styles.doctorListings.listing.btn}>
        {/* TO DO: figure out how to handle these links. Will have to do with dynamic routes or something. */}
        {/* <Link
          to={{
            screen: "DoctorProfile",
            params: {
              practitionerId: id,
            },
          }}
        > */}
        {/* <ButtonText>View Profile</ButtonText> */}
      </a>
    </div>
  );
};

export default function Home() {
  return (
    <main className={styles.container}>
      <Header />
      <Hero
        imageSource="doctorPatient3"
        orientation="left"
        headline="Find a Mold Doctor Near You"
        subHead=""
        // useBtn
        btnLinkToScreen=""
        buttonText=""
      />

      {/* Page Content */}
      <div className={styles.directoryPage}>
        <h2 className={lora.className}>Find Mold Doctors & Practitioners</h2>

        <div className={styles.listingsContainer}>
          <p>insert listings here</p>
          <p>insert listings here</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
