import { Merriweather, Lora } from "next/font/google";
import styles from "../page.module.css";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--lora-font",
  // weight: ["400", "600", "700"],
});

const Hero = ({
  imageSource,
  orientation = "left",
  headline,
  subHead,
  useBtn,
  btnLinkToScreen,
  buttonText,
}) => {
  //
  return (
    <div className={styles.hero}>
      <div
        className={
          orientation == "left"
            ? styles.heroTextBoxLeft
            : styles.heroTextBoxRight
        }
      >
        <h1 style={lora.style}>{headline}</h1>
        <p>{subHead}</p>

        {useBtn && (
          <a className={styles.heroBtn} href="/practitioners">
            <span className={styles.heroBtnText}>{buttonText}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default Hero;
