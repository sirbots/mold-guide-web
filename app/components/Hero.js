import { Merriweather, Lora } from "next/font/google";
import styles from "../page.module.css";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

const Hero = ({
  // orientation = "left",
  headline,
  subHead,
  useBtn,
  btnLink,
  buttonText,
}) => {
  //
  return (
    <div className={styles.hero}>
      <div className={styles.heroTextBox}>
        <h1 style={lora.style}>{headline}</h1>
        <p>{subHead}</p>
      </div>
      {useBtn && (
        <a className={styles.heroBtn} href={btnLink}>
          <span className={styles.heroBtnText}>{buttonText}</span>
        </a>
      )}
    </div>
  );
};

export default Hero;
