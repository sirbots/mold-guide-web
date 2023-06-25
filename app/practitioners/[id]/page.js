"use client";
// Images
import Image from "next/image";
import maleDoctor2 from "../../../public/male-doctor2.png";
import femaleDoctor6 from "../../../public/female-doctor6.png";

// Firebase
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Helpers
import convertTextArrayToFormattedString from "../../components/helpers/convertTextArrayToFormattedString";
import arrayToCommaString from "../../components/helpers/arrayToCommaString";

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
  // const posts = await fetch('https://.../posts').then((res) => res.json())
  // Get the doctor data with a Firestore hook
  const doctorsList = await getDocs(collection(db, "practitioners"));

  return doctorsList.map((doc) => ({
    id: doc.id,
  }));
}

export default function Page({ params }) {
  const practitionerId = params.id;
  const [doctor, loading, error] = useDocumentDataOnce(
    doc(db, "practitioners", practitionerId)
  );

  // console.log(params.id);
  // console.log(doctor);

  if (doctor) {
    // Add a period to the end if their middle name is just an initial, else leave as is
    let formattedMiddleName =
      doctor.middle_name && doctor.middle_name.length == 1
        ? doctor.middle_name + "."
        : doctor.middle_name;

    return (
      <main className={styles.container}>
        <Header />

        <div className={styles.singleListingHero}>
          <Image
            src={doctor.gender == "male" ? maleDoctor2 : femaleDoctor6}
            className={styles.img}
            // TO DO: update to make auto-generated alt tag
            alt="Doctor photo."
          />

          <div className={styles.textBox}>
            <span className={styles.doctorName}>
              {doctor.first_name}{" "}
              {doctor.middle_name ? formattedMiddleName : ""} {doctor.last_name}
            </span>
            <div className={styles.addressBox}>
              <span className={styles.streetAddress}>
                {doctor.address_street}
              </span>
              <span className={styles.unitNumber}>{doctor.address_unit}</span>
              <span className={styles.cityState}>
                {doctor.address_city ? doctor.address_city + ", " : ""}{" "}
                {doctor.address_state ? doctor.address_state : ""}
                {doctor.address_zipcode}
              </span>
            </div>
            <span className={styles.phoneNumber}>{doctor.phone_number}</span>
            {doctor.website && (
              <a
                href={doctor.website}
                target="_blank"
                className={styles.website}
              >
                Website
              </a>
            )}
          </div>
        </div>
        {/* 
            // TO DO: build the star ratings design and functionality.
          
            <View style={styles.hero.starContainer}> 
             <MaterialCommunityIcons name="star" size={24} style={styles.star} />
             <MaterialCommunityIcons name="star" size={24} style={styles.star} />
             <MaterialCommunityIcons name="star" size={24} style={styles.star} />
             <MaterialCommunityIcons
               name="star-half-full"
               size={24}
               style={styles.star}
             />
             <MaterialCommunityIcons
               name="star-outline"
               size={24}
               style={styles.star}
             />
           </View>
           */}

        {/* Doctor Info */}
        <div className={styles.singeListingInfoContainer}>
          <h2>About</h2>
          {doctor.bio && <p>{convertTextArrayToFormattedString(doctor.bio)}</p>}

          <h3>Practice Name</h3>
          <p>{doctor.practice_name}</p>

          <h3>Telehealth</h3>
          <p>{doctor.telehealth}</p>

          <h3>Can See Patients In</h3>
          <p>
            {doctor.sees_patients_in &&
              arrayToCommaString(doctor.sees_patients_in)}
          </p>

          <h3>Conditions Treated</h3>
          {doctor.conditions_treated &&
            doctor.conditions_treated.map((condition) => {
              return <p key={condition}>{condition}</p>;
            })}

          <h3>Shoemaker Protocol?</h3>
          {doctor.shoemaker_protocol == true && <p>Yes</p>}
          {doctor.shoemaker_protocol == false && <p>No</p>}

          <h3>Certifications</h3>
          <p>
            {doctor.certifications && arrayToCommaString(doctor.certifications)}
          </p>
        </div>
        <Footer />
      </main>
    );
  }
}
