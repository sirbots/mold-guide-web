// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

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

import { LogoutButton } from "../components/buttons";

// const prisma = new PrismaClient();

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");
  const userDisplayName = JSON.stringify(session.user.displaName).replaceAll(
    '"',
    ""
  );

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Your Profile</h2>

        <p>Name: {userName}</p>
        <p>Email: {userEmail}</p>
        <p>Display Name: {userDisplayName}</p>

        <h2 className={lora.className}>Your Reviews</h2>

        <p>Coming soon.</p>
        {/* TO DO: Add a listing of a user's reviews here, which they can edit from this screen. */}

        <LogoutButton />
      </div>
      <Footer />
    </main>
  );
}
