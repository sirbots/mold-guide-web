import styles from "../../page.module.css";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const Stars = ({ starCount }) => {
  return (
    <div className={styles.starContainer}>
      <span>
        {[...Array(starCount)].map((value, index) => (
          <StarIconSolid
            // colors:
            // #f5e085
            // #239EA1
            // #336765
            key={index}
            className="h-12 w-12"
            stroke="currentColor"
            style={{
              height: "25px",
              width: "25px",
              color: "#239EA1",
            }}
          />
        ))}
        {[...Array(5 - starCount)].map((value, index) => (
          <StarIconOutline
            key={index}
            className="h-12 w-12"
            stroke="currentColor"
            style={{
              height: "25px",
              width: "25px",
              color: "#239EA1",
            }}
          />
        ))}
      </span>
    </div>
  );
};

export default Stars;
