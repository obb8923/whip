import React, { useEffect, useState } from "react";
import axios from "axios";
import GNB from "./GNB";
import { useLocation } from "react-router-dom";
import styles from "../css/Day.module.css";
import ProgressBar from "./ProgressBar";
import { ClipLoader } from "react-spinners";

export default function Day() {
  const location = useLocation();
  const {
    dayData,
    year: initialYear,
    month: initialMonth,
    day: initialDay,
    percentages,
  } = location.state || {};

  const [carboP, setCarboP] = useState(0);
  const [proteinP, setProteinP] = useState(0);
  const [fatP, setFatP] = useState(0);

  const [year] = useState(initialYear || "");
  const [month] = useState(initialMonth ? initialMonth.padStart(2, "0") : "");
  const [day] = useState(initialDay ? initialDay.padStart(2, "0") : "");
  const [data, setData] = useState(dayData || []);
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  const [loading, setLoading] = useState(false);

  const [newFoodName, setNewFoodName] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    const UID = localStorage.getItem("id");

    try {
      setLoading(true);

      const response = await axios.post("/back/api/food/get_day", {
        UID: UID,
        year: year,
        month: month,
        day: day,
      });

      // 데이터를 받아오면 각 칼로리 값을 모두 더하여 totalCalories 설정
      const totalCalories = response.data.foods.reduce(
        (acc, food) => acc + parseFloat(food.calories),
        0
      );

      setData(response.data.foods || []);
      setCarboP(response.data.percentages.carbohydrates_percentage);
      setProteinP(response.data.percentages.protein_percentage);
      setFatP(response.data.percentages.fat_percentage);
      setTotalCalories(totalCalories); // 계산된 총 칼로리 설정
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, month, day]);

  useEffect(() => {
    if (data.length > 0) {
      const calories = data.reduce(
        (acc, item) => acc + parseFloat(item.calories),
        0
      );
      const carbohydrates = data.reduce(
        (acc, item) => acc + parseFloat(item.carbohydrates),
        0
      );
      const fat = data.reduce((acc, item) => acc + parseFloat(item.fat), 0);
      const protein = data.reduce(
        (acc, item) => acc + parseFloat(item.protein),
        0
      );

      setTotalCalories(calories);
      setTotalCarbohydrates(carbohydrates);
      setTotalFat(fat);
      setTotalProtein(protein);
    }
  }, [data]);
  useEffect(() => {
    console.log(carboP, proteinP, fatP);
  }, [carboP, proteinP, fatP]);
  const handleDelete = async (foodIndex) => {
    const UID = localStorage.getItem("id");
    const formattedDate = `${year}-${month}-${day}`;

    try {
      await axios.delete("/back/api/delete_food", {
        params: {
          ID: UID,
          DATE: formattedDate,
          FOOD_INDEX: foodIndex,
        },
      });
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("음식 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUpdate = (foodIndex) => {
    setUpdateIndex(foodIndex);
  };

  const handleUpdateSubmit = async () => {
    const UID = localStorage.getItem("id");
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const response = await axios.post("/back/api/update_food", {
        ID: UID,
        DATE: formattedDate,
        FOOD_INDEX: updateIndex,
        NEW_FOOD_NAME: newFoodName,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.food_index === updateIndex
            ? {
                calories: response.data.data.calories
                  ? response.data.data.calories.replace(/[^0-9]/g, "")
                  : "0",
                carbohydrates: response.data.data.carbohydrates
                  ? response.data.data.carbohydrates.replace(/[^0-9]/g, "")
                  : "0",
                fat: response.data.data.fat
                  ? response.data.data.fat.replace(/[^0-9]/g, "")
                  : "0",
                food_index: updateIndex,
                food_name: response.data.data.food_name || "Unknown",
                protein: response.data.data.protein
                  ? response.data.data.protein.replace(/[^0-9]/g, "")
                  : "0",
              }
            : item
        )
      );
      setUpdateIndex(null);
      setNewFoodName("");
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("Error updating food:", error);
      alert("음식 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAddFood = async () => {
    const UID = localStorage.getItem("id");
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const response = await axios.post("/back/api/add_food", {
        ID: UID,
        DATE: formattedDate,
        FOOD_NAME: newFoodName,
      });

      setData((prevData) => [
        ...prevData,
        {
          calories: response.data.data.calories
            ? parseFloat(response.data.data.calories.replace(/[^0-9.]/g, ""))
            : "0",
          carbohydrates: response.data.data.carbohydrates
            ? parseFloat(
                response.data.data.carbohydrates.replace(/[^0-9.]/g, "")
              )
            : "0",
          fat: response.data.data.fat
            ? parseFloat(response.data.data.fat.replace(/[^0-9.]/g, ""))
            : "0",
          food_index: response.data.data.food_index, // 기존 데이터에 food_index를 맞춰줍니다.
          food_name: response.data.data.food_name || "Unknown",
          protein: response.data.data.protein
            ? parseFloat(response.data.data.protein.replace(/[^0-9.]/g, ""))
            : "0",
        },
      ]);

      setNewFoodName("");
      setShowAddForm(false);
      fetchData(); // 데이터 새로 고침
    } catch (error) {
      console.error("Error adding food:", error);
      alert("음식 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="frameBox">
      <div className="contentBox">
        <div className={styles.dayFrame}>
          <h2>
            {year}년 {month}월 {day}일 정보
          </h2>
          {loading && (
            <div className="overlay">
              <ClipLoader />
            </div>
          )}
          {data.length > 0 ? (
            <div className={styles.ProgressBarContainer}>
              <div>영양소 별 진행상황</div>
              <div>총 칼로리: {totalCalories}</div>
              <ProgressBar
                name={"탄수화물"}
                value={carboP}
                max={100}
                color="#FF6B6B"
              />
              <ProgressBar
                name={"단백질"}
                value={proteinP}
                max={100}
                color="#6B6BFF"
              />
              <ProgressBar
                name={"지방"}
                value={fatP}
                max={100}
                color="#FFD700"
              />
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
                    <th className={styles.noPadding}>
                      <button
                        onClick={() => setShowAddForm(true)}
                        style={{ all: "unset", cursor: "pointer" }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 5.5C11 4.94772 10.5523 4.5 10 4.5C9.44772 4.5 9 4.94772 9 5.5H11ZM9 14.5C9 15.0523 9.44771 15.5 10 15.5C10.5523 15.5 11 15.0523 11 14.5H9ZM14.5 11C15.0523 11 15.5 10.5523 15.5 10C15.5 9.44771 15.0523 9 14.5 9V11ZM5.5 9C4.94772 9 4.5 9.44771 4.5 10C4.5 10.5523 4.94772 11 5.5 11V9ZM18 10C18 14.4183 14.4183 18 10 18V20C15.5228 20 20 15.5228 20 10H18ZM10 18C5.58172 18 2 14.4183 2 10H0C0 15.5228 4.47715 20 10 20V18ZM2 10C2 5.58172 5.58172 2 10 2V0C4.47715 0 0 4.47715 0 10H2ZM10 2C14.4183 2 18 5.58172 18 10H20C20 4.47715 15.5228 0 10 0V2ZM9 5.5L9 10H11L11 5.5H9ZM9 10V14.5H11V10H9ZM14.5 9H10V11H14.5V9ZM10 9H5.5V11H10V9Z"
                            stroke="#6BFF6B"
                            strokeWidth="1"
                            fill="#6BFF6B"
                          />
                        </svg>
                      </button>
                    </th>
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
                              stroke="#FF6B6B"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleUpdate(item.food_index)}
                          style={{
                            border: "none",
                            background: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.3247 1.90729C12.7151 1.51674 13.3481 1.51647 13.7388 1.9067L16.0922 4.25746C16.483 4.64784 16.4833 5.28116 16.0928 5.67187L6.13495 15.6352C5.99567 15.7745 5.81832 15.8696 5.62517 15.9085L1.19995 16.8002L2.0932 12.3802C2.13215 12.1875 2.22707 12.0105 2.36608 11.8714L12.3247 1.90729Z"
                              stroke="#6D6BFF"
                              strokeWidth="1"
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
        {updateIndex !== null && (
          <div className={styles.updateForm}>
            <input
              type="text"
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
              placeholder="핫바 두 개 먹었어"
            />
            <button onClick={handleUpdateSubmit}>수정</button>
          </div>
        )}
        {showAddForm && (
          <div className={styles.updateForm}>
            <input
              type="text"
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
              placeholder="음식 이름을 입력하세요"
            />
            <button onClick={handleAddFood}>추가</button>
            <button onClick={() => setShowAddForm(false)}>취소</button>
          </div>
        )}
      </div>

      <GNB />
    </div>
  );
}
