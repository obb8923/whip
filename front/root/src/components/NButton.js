import styles from "../css/NButton.module.css";
import { useNavigate } from "react-router-dom";

export default function NButton({ where }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/${where}`);
  };

  return (
    <div className={styles.NButtonFrame} onClick={handleNav}>
      <>{where}</>
    </div>
  );
}
