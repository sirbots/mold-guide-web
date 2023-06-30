"use client";

// Components
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

// Styles & Fonts
import styles from "../page.module.css";
import { Lora } from "next/font/google";
import Image from "next/image";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

// export const metadata = {
//   title: "Sign up for an account",
// };

// ****************
// next-auth stuff!
// ****************
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cache, use } from "react";

const getUsers = cache(() =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json())
);

export default function ProfilePage() {
  const { status } = useSession({
    required: true,
    // If the user is not logged in, redirect them to the /signin page.
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  let users = use(getUsers());

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
