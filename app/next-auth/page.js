// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
// import SignUpForm from "../components/forms/SignUpForm";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// export const metadata = {
//   title: "Sign up for an account",
// };

// next-auth stuff!
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "../components/buttons";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { User } from "../components/UserComponent";

import { compare } from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const user = await db.user.findUnique({
  where: {
    email: "admin@admin.com",
  },
});

export default async function NextAuthPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  console.log(user);

  return (
    <main className={styles.container}>
      <Header />

      {/* Page Content */}
      <div className={styles.pageContent}>
        <h2 className={lora.className}>next-auth Workspace</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginButton />
          <RegisterButton />
          <LogoutButton />
          <ProfileButton />

          <h1>Server Session</h1>
          <p></p>
          <pre>{JSON.stringify(session)}</pre>

          <User />
        </div>
      </div>

      <Footer />
    </main>
  );
}
