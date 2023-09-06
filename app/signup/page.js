// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import SignUpForm from "../components/forms/SignUpForm";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Sign up for an account",
};

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Header />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>Create Your Account</h2>
      </div>

      <SignUpForm />
      <Footer />
    </main>
  );
}
