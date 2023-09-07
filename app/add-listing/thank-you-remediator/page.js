// this route is protected in the middleware.

// Components
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

// SEO
export const metadata = {
  title: "Thank you for submitting a new listing to The Mold Guide",
};

// Styles & Fonts
import styles from "../../page.module.css";
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
        <h2 className={lora.className}>Thank you!</h2>
        <p style={{ maxWidth: "500px" }}>
          Your submission has been received. We will review it and publish it as
          soon as possible.
        </p>
      </div>
      <Footer />
    </main>
  );
}
