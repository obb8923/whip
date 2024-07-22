import styles from "../css/Frame.module.css";
import GNB from "./GNB";
export default function Frame() {
  return (
    <div className={styles.frameBody}>
      <div className={styles.mainBody}>
        <GNB />
      </div>
    </div>
  );
}
