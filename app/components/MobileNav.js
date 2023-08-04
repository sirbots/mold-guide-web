"use client";

import { useState } from "react";

// Styles & Images
import styles from "../page.module.css";
import Image from "next/image";
import hamburgerIcon from "../../public/hamburger_icon.png";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Update menuOpen state when menu is clicked
  const hamburgerClick = () => {
    if (menuOpen == false) setMenuOpen(true);
    if (menuOpen == true) setMenuOpen(false);
  };

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
              <a href="/api/auth/signin">Sign In</a>
            </li>
            <li>
              <a href="/signup">Register</a>
            </li>
          </>
        )}
        <li>
          <a href="/add-listing">+ Add Listing</a>
        </li>
      </ul>
    </div>
  );
}
