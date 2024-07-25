import styles from "../css/GNB.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function GNB() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (where) => {
    navigate(where === "home" ? `/` : `/${where}`);
  };

  const isActive = (path) => {
    return location.pathname === (path === "home" ? "/" : `/${path}`);
  };

  return (
    <div className={styles.GNBBody}>
      <button
        className={`${styles.linkButton} ${
          isActive("home") ? styles.active : ""
        }`}
        onClick={() => handleNav("home")}
      >
        Home
      </button>
      <button
        className={`${styles.linkButton} ${
          isActive("calendar") ? styles.active : ""
        }`}
        onClick={() => handleNav("calendar")}
      >
        Calendar
      </button>
      <button
        className={`${styles.linkButton} ${
          isActive("profile") ? styles.active : ""
        }`}
        onClick={() => handleNav("profile")}
      >
        Profile
      </button>
    </div>
  );
}
