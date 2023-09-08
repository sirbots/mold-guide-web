// Styes & Images
import styles from "../../page.module.css";
import Image from "next/image";
import logo from "../../../public/logos/logo_with_text.png";

// Components
import MobileNav from "./MobileNav";

// Auth
import { authOptions } from "../../lib/auth";
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
            <a
              href="/practitioners"
              data-umami-event="Nav Click"
              data-umami-event-form="Mold Doctors"
            >
              Mold Doctors
            </a>
          </li>
          <li>
            <a
              href="/inspection"
              data-umami-event="Nav Click"
              data-umami-event-form="Inspectors"
            >
              Inspectors
            </a>
          </li>
          <li>
            <a
              href="/remediation"
              data-umami-event="Nav Click"
              data-umami-event-form="Remediation"
            >
              Remediation
            </a>
          </li>
          <li>
            <a
              href="/resources"
              data-umami-event="Nav Click"
              data-umami-event-form="Resources"
            >
              Resources
            </a>
          </li>
          <li>
            <a
              href="/about"
              data-umami-event="Nav Click"
              data-umami-event-form="About"
            >
              About
            </a>
          </li>

          {session ? (
            <li>
              <a
                href="/profile"
                data-umami-event="Nav Click"
                data-umami-event-form="Profile"
              >
                Profile
              </a>
            </li>
          ) : (
            <>
              <li>
                <a
                  href="/api/auth/signin"
                  data-umami-event="Nav Click"
                  data-umami-event-form="Login"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  data-umami-event="Nav Click"
                  data-umami-event-form="Register"
                >
                  Register
                </a>
              </li>
            </>
          )}
          <li>
            <a
              href="/add-listing"
              data-umami-event="Nav Click"
              data-umami-event-form="Add Listing"
            >
              + Add Listing
            </a>
          </li>
        </ul>
        {/* Mobile Nav Links */}
        <MobileNav />
      </div>
    </div>
  );
}
