// Styes & Images
import styles from "../page.module.css";
import Image from "next/image";
import logo from "../../public/logos/logo_with_text.png";
import hamburgerIcon from "../../public/hamburger_icon.png";

// Auth
import { authOptions } from "../lib/auth";

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
      <div className={styles.logoBox}>
        <a href="/">
          <Image
            src={logo}
            className={styles.logoImg}
            alt="The Mold Guide logo"
          />
        </a>
      </div>

      <div className={styles.navLinks}>
        <ul className={styles.desktopNav}>
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
            <a href="/practitioners">Find Mold Doctors</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
        <div className={styles.hamburgerHolder}>
          <a href="/">
            <Image
              src={hamburgerIcon}
              className={styles.hamburgerImg}
              alt="Click to open the mobile menu."
            />
          </a>
        </div>
      </div>
    </div>
  );
}
