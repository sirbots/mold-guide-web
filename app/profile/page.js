// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

// Components
import Header from "../components/layout/Header";
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

  const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Your Profile</h2>

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
