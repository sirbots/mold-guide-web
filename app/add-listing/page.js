// this route is protected in the middleware.

// Components
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AddListingForms from "../components/forms/AddListingForms";

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

export default async function AddListingPage() {
  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.addListingPage}>
        <AddListingForms />
      </div>
      <Footer />
    </main>
  );
}
