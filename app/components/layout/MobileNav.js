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
          <a href="/practitioners">Mold Doctors</a>
        </li>
        <li>
          <a href="/inspection">Mold Inspectors</a>
        </li>
        <li>
          <a href="/remediation">Mold Remediation</a>
        </li>
        <li>
          <a href="/resources">Resources</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {status == "unauthenticated" ? (
          <>
            <li>
              <a href="/api/auth/signin">Login</a>
            </li>
            <li>
              <a href="/signup">Register</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </>
        )}
        {/* <li>
          <a href="/add-listing">+ Add Listing</a>
        </li> */}
      </ul>
    </div>
  );
}
