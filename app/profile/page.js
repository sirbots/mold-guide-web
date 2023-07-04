// this route is protected in the middleware, so no need to import this stuff. see examples in same dir for how to do client- and server-side route protection in a single component.

// import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";
// import { redirect } from "next/navigation";

// Components
import Header from "../components/Header";

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

import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "../components/buttons";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
  });
  console.log(session);
  console.log(user);

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.pageContent}>
        <h2 className={lora.className}>About</h2>

        <LogoutButton />

        <h1>Server Session</h1>
        <p></p>
        <pre>{JSON.stringify(session)}</pre>

        <User />
      </div>
    </main>
  );
}
