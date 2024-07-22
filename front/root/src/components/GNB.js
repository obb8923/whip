import styles from "../css/GNB.module.css";
import NButton from "./NButton";
export default function GNB() {
  return (
    <div className={styles.GNBFrame}>
      <div className={styles.GNBBody}>
        <NButton where="home"></NButton>
        <NButton where="write"></NButton>
        <NButton where="calendae"></NButton>
        <NButton where="profile"></NButton>
      </div>
    </div>
  );
}
