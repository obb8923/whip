import React, { useEffect, useState } from "react";
import styles from "../css/ProgressBar.module.css";

const ProgressBar = ({ name, value, max, color }) => {
  const [percentage] = useState(((value / max) * 100).toFixed(1));

  return (
    <>
      <small className={styles.progressTitle}>{name}</small>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
          {percentage}%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
