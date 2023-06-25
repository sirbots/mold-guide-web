"use client";

// Styles & Design
import styles from "../page.module.css";

// Firebase
import { db } from "../../firebase/firebaseConfig";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

// Images
import Image from "next/image";
import maleDoctor2 from "../../public/male-doctor2.png";
import femaleDoctor6 from "../../public/female-doctor6.png";

// Helpers
import arrayToCommaString from "../components/helpers/arrayToCommaString";

// Doctor Listing Component
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

      {middleName ? (
        <span className={styles.doctorName}>
          {firstName + " " + middleName + " " + lastName}
        </span>
      ) : (
        <span className={styles.doctorName}>{firstName + " " + lastName}</span>
      )}
      <span className={styles.doctorLocation}>
        {addressCity ? addressCity + ", " : ""}{" "}
        {addressState ? addressState : ""}
      </span>

      {/* Doctor Photo */}
      {/* TO DO: Pull this in from Firestore */}
      <Image
        src={gender == "male" ? maleDoctor2 : femaleDoctor6}
        className={styles.doctorListingsImg}
        alt="Practitioner photo"
      />

      {/* Doctor Metadata */}
      <span className={styles.doctorCertification}>
        {certifications ? arrayToCommaString(certifications) : " "}
      </span>

      {website ? (
        <a href={website} target="_blank" className={styles.website}>
          Website
        </a>
      ) : (
        <a className={styles.website}> </a>
      )}
      {/* Button */}
      <a className={styles.listingBtn}>
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

export default function DirectoryListings({ directoryType }) {
  // Get the doctor data with a Firestore hook
  const [value, loading, error] = useCollection(
    collection(db, "practitioners")
  );

  if (error) console.log(error);
  if (value) console.log(value);

  return (
    <div className={styles.listingsContainer}>
      {value &&
        value.docs.map((doc) => (
          <DoctorListing
            key={doc.id}
            id={doc.id}
            firstName={doc.data().first_name}
            middleName={doc.data().middle_name}
            lastName={doc.data().last_name}
            addressCity={doc.data().address_city}
            addressState={doc.data().address_state}
            certifications={doc.data().certifications}
            website={doc.data().website}
            gender={doc.data().gender}
            profilePhoto="TO DO: insert this dynamically"
          />
        ))}
    </div>
  );
}
