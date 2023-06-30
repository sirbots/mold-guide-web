import styles from "../page.module.css";

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
        <li>
          <a href="/profile">profile</a>
        </li>
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
