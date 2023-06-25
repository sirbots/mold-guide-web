import styles from "../page.module.css";

export default function Footer({ navigation }) {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} TheMoldGuide.com</p>
    </footer>
  );
}
