// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

import { redirect } from "next/navigation";

// Components
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Footer from "../components/layout/Footer";
import { LogoutButton } from "../components/forms/buttons";
import UserReviews from "../components/directories/UserReviews";

// Auth
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

// SEO
export const metadata = {
  title: "About The Mold Guide",
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

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to login page if no session exists
    redirect("/login");
  }

  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");
  const userName = JSON.stringify(session.user.name).replaceAll('"', "");

  return (
    <main className={styles.container}>
      <Header />
      <Hero
        orientation="left"
        headline="Your Profile"
        subHead=""
        // useBtn
        // btnLink=""
        // buttonText=""
      />

      <div className={styles.pageContent}>
        <p>Display Name: {userName}</p>
        <p>Email: {userEmail}</p>

        <h2 className={lora.className}>Your Reviews</h2>

        <UserReviews userEmail={userEmail} />

        <LogoutButton />
      </div>
      <Footer />
    </main>
  );
}
