// Styes & Images
import styles from "../page.module.css";
import Image from "next/image";
import logo from "../../public/logos/logo_with_text.png";

// Components
import MobileNav from "../components/MobileNav";

// Auth
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";

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
  const session = await getUserSession();

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.logoBox}>
        <a href="/">
          <Image
            src={logo}
            className={styles.logoImg}
            alt="The Mold Guide logo"
          />
        </a>
      </div>
      {/* Nav Container */}
      <div className={styles.navLinks}>
        {/* Desktop Nav Links */}
        <ul className={styles.desktopNav}>
          <li>
            <a href="/practitioners">Find Mold Doctors</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>

          {session ? (
            <li>
              <a href="/profile">Profile</a>
            </li>
          ) : (
            <>
              <li>
                <a href="/api/auth/signin">Login</a>
              </li>
              <li>
                <a href="/signup">Register</a>
              </li>
            </>
          )}
          {/* 
          <li>
            <a href="/add-listing">+ Add Listing</a>
          </li> */}
        </ul>
        {/* Mobile Nav Links */}
        <MobileNav />
      </div>
    </div>
  );
}
