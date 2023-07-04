// this route is protected in the middleware, so no need to import this stuff. see examples in same dir for how to do client- and server-side route protection in a single component.

// import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";
// import { redirect } from "next/navigation";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Auth
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { User } from "../components/UserComponent";

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

import { LogoutButton } from "../components/Buttons";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const userName = JSON.stringify(session.user.name).replaceAll('"', "");
  const userEmail = JSON.stringify(session.user.email).replaceAll('"', "");

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>Your Profile</h2>

        <p>Name: {userName}</p>
        <p>Email: {userEmail}</p>

        <LogoutButton />
      </div>
      <Footer />
    </main>
  );
}
