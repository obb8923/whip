import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "./GNB";
import { useLocation } from "react-router-dom";

export default function Day() {
  const location = useLocation();
  const {
    dayData,
    year: initialYear,
    month: initialMonth,
    day: initialDay,
  } = location.state || {};

  const [year] = useState(initialYear || "");
  const [month] = useState(initialMonth || "");
  const [day] = useState(initialDay || "");
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
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    try {
      await axios.delete(
        `back/api/delete_food?ID=${UID}&DATE=${formattedDate}&FOOD_INDEX=${foodIndex}`
      );
      setData((prevData) =>
        prevData.filter((item) => item.food_index !== foodIndex)
      );
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="frameBox">
      <div className="contentBox">
        <div>
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
                      <td>
                        <button onClick={() => handleDelete(item.food_index)}>
                          삭제
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
