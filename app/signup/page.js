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
      <Hero
        orientation="left"
        headline="Create Your Account"
        subHead=""
        // useBtn
        // btnLink=""
        // buttonText=""
      />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <SignUpForm />
        <p style={{ textAlign: "center" }}>
          Already have an account yet? <a href="/login">Log in here.</a>
        </p>
      </div>
      <Footer />
    </main>
  );
}
