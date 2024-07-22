import styles from "../css/GNB.module.css";
import { useNavigate } from "react-router-dom";

export default function GNB() {
  const navigate = useNavigate();

  const handleNav = (where) => {
    navigate(where === "home" ? `/` : `/${where}`);
  };

  return (
    <div className={styles.GNBBody}>
      <button className={styles.linkButton} onClick={() => handleNav("home")}>
        Home
      </button>
      <button
        className={styles.linkButton}
        onClick={() => handleNav("calendar")}
      >
        Calendar
      </button>
    </div>
  );
}
