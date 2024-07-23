import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "./GNB";
import { useLocation } from "react-router-dom";
import styles from "../css/Day.module.css";
export default function Day() {
  const location = useLocation();
  const {
    dayData,
    year: initialYear,
    month: initialMonth,
    day: initialDay,
  } = location.state || {};

  const [year] = useState(initialYear || "");
  const [month] = useState(initialMonth ? initialMonth.padStart(2, "0") : "");
  const [day] = useState(initialDay ? initialDay.padStart(2, "0") : "");
  const [data, setData] = useState(dayData || []);

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      const calories = data.reduce((acc, item) => acc + item.calories, 0);
      const carbohydrates = data.reduce(
        (acc, item) => acc + item.carbohydrates,
        0
      );
      const fat = data.reduce((acc, item) => acc + item.fat, 0);
      const protein = data.reduce((acc, item) => acc + item.protein, 0);

      setTotalCalories(calories);
      setTotalCarbohydrates(carbohydrates);
      setTotalFat(fat);
      setTotalProtein(protein);
    }
  }, [data]);

  const handleDelete = async (foodIndex) => {
    const UID = localStorage.getItem("id");

    // 날짜 포맷팅
    const formattedDate = `${year}-${month}-${day}`;

    try {
      await axios.delete("/back/api/delete_food", {
        params: {
          ID: UID,
          DATE: formattedDate,
          FOOD_INDEX: foodIndex,
        },
      });
      setData((prevData) =>
        prevData.filter((item) => item.food_index !== foodIndex)
      );
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("음식 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="frameBox">
      <div className="contentBox">
        <div className={styles.dayFrame}>
          <h2>
            {year}년 {month}월 {day}일 정보
          </h2>
          {data.length > 0 ? (
            <div>
              <h3>총 영양소:</h3>
              <p>총 칼로리: {totalCalories} kcal</p>
              <p>총 탄수화물: {totalCarbohydrates} g</p>
              <p>총 지방: {totalFat} g</p>
              <p>총 단백질: {totalProtein} g</p>
              <h3>이 날 먹은 것들</h3>
            </div>
          ) : (
            <></>
          )}
          {data.length > 0 ? (
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>음식</th>
                    <th>칼로리</th>
                    <th>탄수화물</th>
                    <th>단백질</th>
                    <th>지방</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.food_index}>
                      <td>{item.food_name}</td>
                      <td>{item.calories}</td>
                      <td>{item.carbohydrates}</td>
                      <td>{item.protein}</td>
                      <td>{item.fat}</td>
                      <td className={styles.noPadding}>
                        <button
                          onClick={() => handleDelete(item.food_index)}
                          style={{
                            border: "none",
                            background: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4.17647H17M7 14.7647V8.41177M11 14.7647V8.41177M13 19H5C3.89543 19 3 18.0519 3 16.8824V5.23529C3 4.65052 3.44772 4.17647 4 4.17647H14C14.5523 4.17647 15 4.65052 15 5.23529V16.8824C15 18.0519 14.1046 19 13 19ZM7 4.17647H11C11.5523 4.17647 12 3.70242 12 3.11765V2.05882C12 1.47405 11.5523 1 11 1H7C6.44772 1 6 1.47405 6 2.05882V3.11765C6 3.70242 6.44772 4.17647 7 4.17647Z"
                              stroke="#FF6B6B" // 선 색상을 빨간색으로 변경
                              strokeWidth="1" // 선 두께를 50% 얇게 설정
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>기록된 음식이 없습니다.</p>
          )}
        </div>
      </div>

      <GNB />
    </div>
  );
}
