import styles from "../page.module.css";

// Auth
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth/next";

async function getUserSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }
  if (session) {
    return true;
  }
}

// Create a header component to use in the Navigator
export default async function Header() {
  // const session = await getUserSession();

  return (
    <div className={styles.header}>
      {/* Desktop Nav Links */}
      <ul className={styles.desktopNav}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/practitioners">Find Mold Doctors</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {/* {session ? (
          <li>
            <a href="/profile">Profile</a>
          </li>
        ) : (
          <>
            <li>
              <a href="/api/auth/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">Register</a>
            </li>
          </>
        )} */}
      </ul>

      {/* Mobile Nav Links */}
      <ul className={styles.mobileNav}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/practitioners">Find Mold Doctors</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </div>
  );
}
