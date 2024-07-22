import React, { useState } from "react";
import axios from "axios";
import styles from "../../css/Main.module.css"; // Import CSS module
import GNB from "../GNB";

export default function Main() {
  const [searchText, setSearchText] = useState("");

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
    <div className="frameBox">
      <div className="contentBox">
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
      </div>

      <GNB></GNB>
    </div>
  );
}