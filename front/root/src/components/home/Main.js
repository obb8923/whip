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
  const [isSubmitting, setIsSubmitting] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태 추가
  const [showImageInput, setShowImageInput] = useState(false); // 이미지 입력 창 상태
  const [UID] = useState(localStorage.getItem("id"));
  // 로그인 안 되어있을 때, 로그인 화면으로 보내기
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // 파일 선택 처리
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(1); // 시작할 때 1로 설정
    const user_id = localStorage.getItem("id");
    console.log(
      "Submitting search with text:",
      user_id,
      "and food name:",
      searchText
    ); // Debug log
    try {
      const response = await axios.post("/back/api/send", {
        user_id,
        food_name: searchText,
      });
      console.log("send:", response.data);
      const { calorie, carbohydrate, protein, fat, food_name } = response.data;
      setCalorie(calorie);
      setCarbohydrate(carbohydrate);
      setProtein(protein);
      setFat(fat);
      setFoodName(food_name);
      setIsSubmitting(2); // 성공하면 2로 설정
    } catch (error) {
      console.error(
        "Error submitting search:",
        error.response?.data || error.message
      );
      setIsSubmitting(0); // 오류가 나면 0으로 설정
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("id");

    try {
      const response = await axios.post("/back/api/send2", {
        user_id,
        nutrition_info: {
          food_name: foodName,
          protein: protein,
          fat: fat,
          carbohydrate: carbohydrate,
          calorie: calorie,
        },
      });
      console.log("send2:", response.data);
      const { message } = response.data;
      if (message === "good") {
        setIsSubmitting(3); // 성공하면 3으로 설정
      }
    } catch (error) {
      console.error(
        "Error submitting search:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (isSubmitting === 3) {
      setFoodName("");
      setCalorie("");
      setCarbohydrate("");
      setProtein("");
      setFat("");
      setSearchText("");
      setIsSubmitting(0); // 완료 후 0으로 초기화
    }
  }, [isSubmitting]);

  const visibilityStyle = (isVisible) => ({
    visibility: isVisible ? "visible" : "hidden",
  });

  const imageButton = (event) => {
    event.preventDefault();
    setShowImageInput(true); // 이미지 입력 창 열기
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/back/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("upload:", response.data);
      setShowImageInput(false); // 이미지 입력 창 닫기
      const { calorie, carbohydrate, protein, fat, food_name } = response.data;
      setCalorie(calorie);
      setCarbohydrate(carbohydrate);
      setProtein(protein);
      setFat(fat);
      setFoodName(food_name);
      setIsSubmitting(2); // 성공하면 2로 설정
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    }
  };
  function logoutHandler() {
    localStorage.setItem("id", "");
    navigate("/login");
  }
  return (
    <div className="frameBox">
      <div className="contentBox">
        <div className={styles.mainFrame}>
          <div className={styles.topView}>
            <small style={{ visibility: "hidden" }}>안녕하세요! {UID}님!</small>
            <button onClick={logoutHandler} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
          <p className="logo" style={{ marginTop: 0, marginBottom: 0 }}>
            whip
          </p>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div
              className={styles.topView}
              style={{ justifyContent: "center" }}
            >
              <small style={{ marginBottom: 8 }}>
                안녕하세요! <b>{UID}</b>님!
              </small>
            </div>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  <span className={styles.srOnly}>Input Submit</span>
                </button>

                <button className={styles.imageButton} onClick={imageButton}>
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5101 6.13298L9.41022 13.2328C8.56597 14.0771 7.19717 14.0771 6.35292 13.2328C5.5069 12.3868 5.50893 11.0145 6.35745 10.171L11.8632 4.69779L13.2459 3.31511C14.9282 1.63278 17.6558 1.63278 19.3381 3.31512C21.0205 4.99745 21.0205 7.72506 19.3381 9.4074L17.9763 10.7693L12.8148 15.9308C10.1448 18.712 6.09921 19.1351 3.27061 16.4197C0.476637 13.7375 0.950206 9.71622 3.7752 6.89123L8.91637 1.74927"
                      stroke="blue"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className={styles.srOnly}>Image Input Submit</span>
                </button>
              </div>
            </div>
          </form>

          <form
            className={styles.formContainer}
            style={visibilityStyle(isSubmitting > 0)}
          >
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="foodName"
                id="foodName"
                className={styles.inputField}
                placeholder=" "
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
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
                onChange={(e) => setCalorie(e.target.value)}
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
                onChange={(e) => setCarbohydrate(e.target.value)}
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
                onChange={(e) => setProtein(e.target.value)}
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
                onChange={(e) => setFat(e.target.value)}
                required
              />
              <label htmlFor="fat" className={styles.inputLabel}>
                지방
              </label>
            </div>
            <button
              className={styles.searchButton}
              onClick={handleSubmit2}
              style={visibilityStyle(isSubmitting === 2)}
            >
              기록하기
            </button>
          </form>
        </div>
      </div>
      {showImageInput && (
        <div className={styles.imageInputPopup}>
          <form onSubmit={handleImageSubmit}>
            <input type="file" onChange={handleFileChange} required />
            <button type="submit" className={styles.uploadButton}>
              업로드
            </button>
            <button
              onClick={() => setShowImageInput(false)}
              className={styles.cancelButton}
            >
              취소
            </button>
          </form>
        </div>
      )}
      <GNB />
    </div>
  );
}
