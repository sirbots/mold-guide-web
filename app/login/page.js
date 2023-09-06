// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/forms/LoginForm";

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
  title: "Log in to your account",
};

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <Header />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>Log in to your account</h2>
      </div>

      <LoginForm />

      <Footer />
    </main>
  );
}
