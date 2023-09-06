// import GiveFeedbackForm from "/forms/GiveFeedbackForm";
import GiveFeedbackForm from "../components/forms/GiveFeedbackForm";

import styles from "../page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <GiveFeedbackForm />
      <p>
        This site is for informational purposes only. Nothing on this site
        should be construed as medical advice.
      </p>
      <p>&copy; {new Date().getFullYear()} TheMoldGuide.com</p>
    </footer>
  );
}
