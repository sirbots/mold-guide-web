// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LogoutButton } from "../components/buttons";
import UserReviews from "../components/UserReviews";

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

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");
  const userDisplayName = JSON.stringify(session.user.displayName).replaceAll(
    '"',
    ""
  );

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Your Profile</h2>

        <p>Name: {userName}</p>
        <p>Display Name: {userDisplayName}</p>
        <p>Email: {userEmail}</p>

        <h2 className={lora.className}>Your Reviews</h2>

        <UserReviews userEmail={userEmail} />

        <LogoutButton />
      </div>
      <Footer />
    </main>
  );
}
