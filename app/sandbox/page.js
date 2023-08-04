// this route is protected in the middleware.
// see examples in same dir for how to do client- and server-side route protection in a single component.

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

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
const practitioners = await prisma.doctor.findMany();
const allReviews = await prisma.review.findMany();

const getAuthor = await prisma.user.findUnique({
  where: {
    email: "admin@admin.com",
  },
  include: {
    reviews: true, // All posts where authorId == 20
  },
});

export default async function SandboxPage() {
  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2>working with getAuthor</h2>
        <p>
          {getAuthor.reviews &&
            getAuthor.reviews.map((rev) => {
              return (
                <div key={rev.id}>
                  <p>Title: {rev.title}</p>
                  <p>Body: {rev.body}</p>
                </div>
              );
            })}
        </p>
        <h2 className={lora.className}>Show All Reviews</h2>
        {allReviews &&
          allReviews.map((rev) => {
            return (
              <div key={rev.id}>
                <p>Rating: {rev.rating}</p>
                <p>Review text: {rev.review}</p>
                <p>AuthorId: {rev.authorId}</p>
                <p>DoctorId: {rev.doctorId}</p>
              </div>
            );
          })}

        <h2 className={lora.className}>Show Reviews for a given user:</h2>
      </div>
      <Footer />
    </main>
  );
}
