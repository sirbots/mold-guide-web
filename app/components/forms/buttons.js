"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

// Styles & Fonts
import styles from "./forms.module.css";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Log in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/signup" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <a
        className={styles.logoutBtn}
        onClick={() => {
          umami.track("Logout");
          signOut({ callbackUrl: "/" });
        }}
      >
        <span className={styles.logoutBtnText}>Log Out</span>
      </a>
    </div>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
