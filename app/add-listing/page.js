// this route is protected in the middleware.

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewListingForm from "../components/forms/NewListingForm";

// Auth
// import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";

// SEO
export const metadata = {
  title: "Submit a New Listing to The Mold Guide",
};

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// Database
import { prisma } from "../lib/prisma";

export default async function AddListingPage() {
  //   const session = await getServerSession(authOptions);

  //   const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  //   const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");
  //   const userDisplayName = JSON.stringify(session.user.displayName).replaceAll(
  //     '"',
  //     ""
  //   );

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.addListingPage}>
        <h2 className={lora.className}>Add a Practitioner</h2>
        <p style={{ maxWidth: "500px" }}>
          Submit the form below to add a new practitioner to the directory.
          Fields marked with an asterisk (*) are required.
        </p>
        <NewListingForm />
      </div>
      <Footer />
    </main>
  );
}
