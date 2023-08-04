// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LogoutButton } from "../components/buttons";

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

// Database
import { prisma } from "../lib/prisma";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");
  const userDisplayName = JSON.stringify(session.user.displayName).replaceAll(
    '"',
    ""
  );

  const userReviews = await prisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
    include: {
      reviews: true, // All posts where authorId == 20
    },
  });

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Your Profile</h2>

        <p>Name: {userName}</p>
        <p>Display Name: {userDisplayName}</p>
        <p>Email: {userEmail}</p>

        <h2 className={lora.className}>Your Reviews</h2>

        {userReviews.reviews &&
          userReviews.reviews.map((rev) => {
            return (
              <div key={rev.id}>
                <p>DoctorId: {rev.doctorId}</p>
                <p>Rating: {rev.rating}</p>
                <p>Title: {rev.title}</p>
                <p>Body: {rev.body}</p>
              </div>
            );
          })}

        <LogoutButton />
      </div>
      <Footer />
    </main>
  );
}
