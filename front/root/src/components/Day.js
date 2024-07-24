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

  const [newFoodName, setNewFoodName] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // 추가 폼 표시 상태

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
      setData((prevData) =>
        prevData.filter((item) => item.food_index !== foodIndex)
      );
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
      const newFoodData = response.data;
      console.log("New food data:", newFoodData);
      console.log("기존data: ", data);

      setData((prevData) =>
        prevData.map((item) =>
          item.food_index === updateIndex
            ? {
                calories: newFoodData.data.calories
                  ? newFoodData.data.calories.replace(/[^0-9]/g, "")
                  : "0",
                carbohydrates: newFoodData.data.carbohydrates
                  ? newFoodData.data.carbohydrates.replace(/[^0-9]/g, "")
                  : "0",
                fat: newFoodData.data.fat
                  ? newFoodData.data.fat.replace(/[^0-9]/g, "")
                  : "0",
                food_index: updateIndex,
                food_name: newFoodData.data.food_name || "Unknown",
                protein: newFoodData.data.protein
                  ? newFoodData.data.protein.replace(/[^0-9]/g, "")
                  : "0",
              }
            : item
        )
      );
      setUpdateIndex(null);
      setNewFoodName("");
    } catch (error) {
      console.error("Error updating food:", error);
      alert("음식 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAddFood = async () => {
    const UID = localStorage.getItem("id");
    const formattedDate = `${year}-${month}-${day}`;

    try {
      // API 호출
      const response = await axios.post("/back/api/add_food", {
        ID: UID,
        DATE: formattedDate,
        FOOD_NAME: newFoodName,
      });

      // 응답 데이터에서 필요한 정보를 추출
      const newFoodData = response.data;
      console.log("New food data:", newFoodData);
      console.log("New food data.data:", newFoodData.data);

      // 새로운 음식 항목을 데이터 상태에 추가
      setData((prevData) => {
        const updatedData = [
          ...prevData,
          {
            calories: newFoodData.data.calories
              ? parseFloat(newFoodData.data.calories.replace(/[^0-9.]/g, ""))
              : "0",
            carbohydrates: newFoodData.data.carbohydrates
              ? parseFloat(
                  newFoodData.data.carbohydrates.replace(/[^0-9.]/g, "")
                )
              : "0",
            fat: newFoodData.data.fat
              ? parseFloat(newFoodData.data.fat.replace(/[^0-9.]/g, ""))
              : "0",
            food_index: updateIndex,
            food_name: newFoodData.data.food_name || "Unknown",
            protein: newFoodData.data.protein
              ? parseFloat(newFoodData.data.protein.replace(/[^0-9.]/g, ""))
              : "0",
          },
        ];

        console.log("Updated data:", updatedData); // 업데이트된 데이터 로그 확인

        return updatedData;
      });

      // 상태 초기화
      setNewFoodName("");
      setShowAddForm(false);
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
          {data.length > 0 ? (
            <div>
              <h3>총 영양소:</h3>
              <p>총 칼로리: {totalCalories} kcal</p>
              <p>총 탄수화물: {totalCarbohydrates} g</p>
              <p>총 지방: {totalFat} g</p>
              <p>총 단백질: {totalProtein} g</p>
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
                    <th>행동</th>
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
              <button
                onClick={() => setShowAddForm(true)}
                className={styles.addButton} // 버튼 스타일을 위한 클래스
              >
                음식 추가
              </button>
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
