import { Merriweather, Lora } from "next/font/google";
import styles from "../../page.module.css";

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
        <h1 style={lora.style} data-test="hero-heading">
          {headline}
        </h1>
        {subHead.length > 0 && (
          <h3 style={{ textAlign: "center" }}>{subHead}</h3>
        )}
      </div>
      {useBtn && (
        <a className={styles.heroBtn} href={btnLink}>
          <span data-test="hero-cta-txt" className={styles.heroBtnText}>
            {buttonText}
          </span>
        </a>
      )}
    </div>
  );
};

export default Hero;
