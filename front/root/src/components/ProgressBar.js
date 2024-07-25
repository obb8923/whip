import React, { useState, useEffect } from "react";
import styles from "../css/ProgressBar.module.css";

const ProgressBar = ({ name, value, max, color }) => {
  const [percentage, setPercentage] = useState(
    ((value / max) * 100).toFixed(1)
  );

  useEffect(() => {
    setPercentage(((value / max) * 100).toFixed(1));
  }, [value, max]); // value와 max가 변경될 때마다 percentage를 재계산함

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
