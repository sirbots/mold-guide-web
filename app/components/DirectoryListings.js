// Styles & Design
import styles from "../page.module.css";

// Database
import { prisma } from "../lib/prisma";

// Images
import Image from "next/image";
import maleDoctor2 from "../../public/male-doctor2.png";
import femaleDoctor6 from "../../public/female-doctor6.png";

// Helpers
import arrayToCommaString from "../lib/arrayToCommaString";
import formatMiddleName from "../lib/formatMiddleName";

// Doctor Listing Component
const DoctorListing = ({
  slug,
  firstName,
  middleName,
  lastName,
  gender,
  addressCity,
  addressState,
  certifications,
  profilePhoto,
}) => {
  return (
    <div className={styles.listing}>
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

      {/* Name */}
      <span className={styles.doctorName}>
        {firstName + " " + formatMiddleName(middleName) + " " + lastName}
      </span>

      {/* Address */}
      <span className={styles.doctorLocation}>
        {addressCity ? addressCity + ", " : ""}{" "}
        {addressState ? addressState : ""}
      </span>

      {/* Doctor Photo */}
      {/* TO DO: Pull this in from MongoDB */}
      <Image
        src={gender == "male" ? maleDoctor2 : femaleDoctor6}
        className={styles.doctorListingsImg}
        alt="Practitioner photo"
      />

      {/* Doctor Metadata */}
      <span className={styles.doctorCertification}>
        {certifications ? arrayToCommaString(certifications) : " "}
      </span>

      {/* Button */}
      <a className={styles.listingBtn} href={"/practitioners/" + slug}>
        <span className={styles.listingBtnText}>View Profile</span>
      </a>
    </div>
  );
};

const practitioners = await prisma.doctor.findMany();

export default function DirectoryListings({ directoryType }) {
  return (
    <div className={styles.listingsContainer}>
      {practitioners &&
        practitioners.map((doc) => (
          <DoctorListing
            key={doc.id}
            slug={doc.slug}
            firstName={doc.firstName}
            middleName={doc.middleName}
            lastName={doc.lastName}
            addressCity={doc.addressCity}
            addressState={doc.addressState}
            certifications={doc.certifications}
            gender={doc.gender}
            profilePhoto="TO DO: insert this dynamically"
          />
        ))}
    </div>
  );
}
