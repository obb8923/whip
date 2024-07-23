import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/Main.module.css"; // Import CSS module
import GNB from "../GNB";
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  // useEffect(() => {
  //   if (!localStorage.getItem("id")) {
  //     navigate("/login");
  //   }
  // }, []);
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/search", { query: searchText });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error submitting search:", error);
    }
  };

  return (
    <div className={styles.frameBox}>
      <div className={styles.contentBox}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label htmlFor="defaultSearch" className={styles.srOnly}>Search</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="defaultSearch"
              className={styles.searchInput}
              placeholder="예시: 닥터유 에너지바 2개를 먹었어"
              value={searchText}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className={styles.searchButton}>Search</button>
          </div>
        </form>
        <form className={styles.formBox}>
          <div className={styles.relativeGroup}>
            <input type="text" name="floating_date" id="floating_date" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_date" className={styles.label}>날짜</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="text" name="floating_calories" id="floating_calories" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_calories" className={styles.label}>칼로리</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="text" name="floating_carbs" id="floating_carbs" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_carbs" className={styles.label}>탄수화물</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="text" name="floating_protein" id="floating_protein" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_protein" className={styles.label}>단백질</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="text" name="floating_fat" id="floating_fat" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_fat" className={styles.label}>지방</label>
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
      <GNB />
    </div>
  );
}
