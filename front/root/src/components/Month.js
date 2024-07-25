import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "./GNB";
import { useLocation } from "react-router-dom";
import styles from "../css/Day.module.css";
import ProgressBar from "./ProgressBar";
export default function Month() {
  const location = useLocation();
  const { monthData, year, month, monthlyAdvice, monthlyP } =
    location.state || {};
  const [carboP] = useState(monthlyP.average_carbohydrates_percentage);
  const [proteinP] = useState(monthlyP.average_protein_percentage);
  const [fatP] = useState(monthlyP.average_fat_percentage);
  return (
    <div className="frameBox">
      <div className="contentBox">
        <div className={styles.dayFrame}>
          <h2>
            {year}년 {month}월 요약
          </h2>
          <div className={styles.ProgressBarContainer}>
            <div>영양소 별 진행상황</div>
            <ProgressBar
              name={"총 탄수화물"}
              value={carboP}
              max={100}
              color="#FF6B6B"
            />
            <ProgressBar
              name={"총 단백질"}
              value={proteinP}
              max={100}
              color="#6B6BFF"
            />
            <ProgressBar
              name={"총 지방"}
              value={fatP}
              max={100}
              color="#FFD700"
            />
          </div>
          <div>{monthlyAdvice}</div>
        </div>
      </div>

      <GNB />
    </div>
  );
}
