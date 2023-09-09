"use client";

import { useState } from "react";

// Auth
// import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

// Styles & Images
import styles from "../../page.module.css";
import Image from "next/image";
import hamburgerIcon from "../../../public/hamburger_icon.png";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Update menuOpen state when menu is clicked
  const hamburgerClick = () => {
    if (menuOpen == false) setMenuOpen(true);
    if (menuOpen == true) setMenuOpen(false);
  };

  // Auth
  const { status } = useSession({
    required: false,
    // If the user is not logged in, redirect them to the /signin page.
    onUnauthenticated() {
      // redirect("/api/auth/signin");
      // return nothing instead of redirecting. the status will get updated and can be used for dynamic display of the account links
      return;
    },
  });

  return (
    <div className={styles.mobileNav}>
      <div className={styles.hamburgerHolder}>
        <a href="#" onClick={() => hamburgerClick()}>
          <Image
            src={hamburgerIcon}
            className={styles.hamburgerImg}
            alt="Click to open the mobile menu."
          />
        </a>
      </div>
      {/* Class changes when hamburger icon is clicked */}
      <ul
        className={menuOpen ? styles.mobileListOpen : styles.mobileListClosed}
      >
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
            data-umami-event-form="Mold Inspectors"
          >
            Mold Inspectors
          </a>
        </li>
        <li>
          <a
            href="/remediation"
            data-umami-event="Nav Click"
            data-umami-event-form="Mold Remediation"
          >
            Mold Remediation
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
        {/* If they are not logged in, the /profile page will redirect to /login */}
        <li>
          <a
            className={styles.navBtnSimple}
            href="/profile"
            data-umami-event="Nav Click"
            data-umami-event-form="My Account"
          >
            <span className={styles.navBtnSimpleText}>My Account</span>
          </a>
        </li>

        <li>
          <a
            className={styles.navBtnCta}
            href="/add-listing"
            data-umami-event="Nav Click"
            data-umami-event-form="Add Listing"
          >
            <span className={styles.navBtnCtaText}>+ Add Listing</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
