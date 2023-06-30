import styles from "../page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

const AccountLinks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <li>
          <a href="/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fnext-auth">
            Sign In
          </a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </>
    );
  }

  return (
    <li>
      <a href="/profile">Profile</a>
    </li>
  );
};

// Create a header component to use in the Navigator
export default function Header({ navigation }) {
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
        <li>
          <a href="/next-auth">next-auth</a>
        </li>
        <AccountLinks />
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
