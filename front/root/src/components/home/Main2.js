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
        <form className={styles.formContainer}>
          <div className={styles.relativeGroup}>
            <input type="email" name="floating_email" id="floating_email" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_email" className={styles.label}>Email address</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="password" name="floating_password" id="floating_password" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_password" className={styles.label}>Password</label>
          </div>
          <div className={styles.relativeGroup}>
            <input type="password" name="repeat_password" id="floating_repeat_password" className={styles.inputField} placeholder=" " required />
            <label htmlFor="floating_repeat_password" className={styles.label}>Confirm password</label>
          </div>
          <div className={styles.gridGroup}>
            <div className={styles.relativeGroup}>
              <input type="text" name="floating_first_name" id="floating_first_name" className={styles.inputField} placeholder=" " required />
              <label htmlFor="floating_first_name" className={styles.label}>First name</label>
            </div>
            <div className={styles.relativeGroup}>
              <input type="text" name="floating_last_name" id="floating_last_name" className={styles.inputField} placeholder=" " required />
              <label htmlFor="floating_last_name" className={styles.label}>Last name</label>
            </div>
          </div>
          <div className={styles.gridGroup}>
            <div className={styles.relativeGroup}>
              <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className={styles.inputField} placeholder=" " required />
              <label htmlFor="floating_phone" className={styles.label}>Phone number (123-456-7890)</label>
            </div>
            <div className={styles.relativeGroup}>
              <input type="text" name="floating_company" id="floating_company" className={styles.inputField} placeholder=" " required />
              <label htmlFor="floating_company" className={styles.label}>Company (Ex. Google)</label>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
      </div>

      <GNB></GNB>
    </div>
  );
}