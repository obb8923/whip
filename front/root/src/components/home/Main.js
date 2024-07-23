import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/Main.module.css"; // Import CSS module
import GNB from "../GNB";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carbohydrate, setCarbohydrate] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");

  // 로그인 안 되어있을 때, 로그인 화면으로 보내기
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("id");
    console.log(
      "Submitting search with text:",
      user_id,
      "and food name:",
      searchText
    ); // Debug log
    try {
      const response = await axios.post("http://localhost:3000/back/api/send", {
        user_id,
        food_name: searchText,
      });
      console.log("Received response:", response.data);
      const { calorie, carbohydrate, protein, fat, food_name } = response.data;
      setCalorie(calorie);
      setCarbohydrate(carbohydrate);
      setProtein(protein);
      setFat(fat);
      setFoodName(food_name);
    } catch (error) {
      console.error(
        "Error submitting search:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="frameBox">
      <div className="contentBox">
        <div className={styles.mainFrame}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label htmlFor="defaultSearch" className={styles.srOnly}>
              Search
            </label>
            <div className={styles.inputContainer}>
              <div className={styles.iconContainer}>
                <svg
                  className={styles.icon}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <div className={styles.searchBox}>
                <input
                  type="search"
                  id="defaultSearch"
                  className={styles.searchInput}
                  placeholder="닭가슴살 2개를 먹었어"
                  value={searchText}
                  onChange={handleInputChange}
                  required
                />

                <button type="submit" className={styles.searchButton}>
                  <svg
                    className={styles.iconRA}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  <span className={styles.srOOnly}>Icon description</span>
                </button>
              </div>
            </div>
          </form>

          <form className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="foodName"
                id="foodName"
                className={styles.inputField}
                placeholder=" "
                value={foodName}
                readOnly
                required
              />
              <label htmlFor="foodName" className={styles.inputLabel}>
                음식이름
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="cal"
                id="cal"
                className={styles.inputField}
                placeholder=" "
                value={calorie}
                readOnly
                required
              />
              <label htmlFor="cal" className={styles.inputLabel}>
                칼로리
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="carbo"
                id="carbo"
                className={styles.inputField}
                placeholder=" "
                value={carbohydrate}
                readOnly
                required
              />
              <label htmlFor="carbo" className={styles.inputLabel}>
                탄수화물
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="protein"
                id="protein"
                className={styles.inputField}
                placeholder=" "
                value={protein}
                readOnly
                required
              />
              <label htmlFor="protein" className={styles.inputLabel}>
                단백질
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="fat"
                id="fat"
                className={styles.inputField}
                placeholder=" "
                value={fat}
                readOnly
                required
              />
              <label htmlFor="fat" className={styles.inputLabel}>
                지방
              </label>
            </div>

            <button className={styles.searchButton} onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <GNB />
    </div>
  );
}
