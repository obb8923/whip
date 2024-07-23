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
                                <div className={styles.searchBox}>
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
                            </div>
                        </form>
                        <form className={styles.formContainer}>
                            <div className={styles.relativeGroup}>
                                <input type="text" name="foodName" id="foodName" className={styles.inputField} placeholder=" " required />
                                <label htmlFor="foodName" className={styles.label}>음식이름</label>
                            </div>
                            <div className={styles.relativeGroup}>
                                <input type="text" name="cal" id="cal" className={styles.inputField} placeholder=" " required />
                                <label htmlFor="cal" className={styles.label}>칼로리</label>
                            </div>
                            <div className={styles.relativeGroup}>
                                <input type="text" name="carbo" id="carbo" className={styles.inputField} placeholder=" " required />
                                <label htmlFor="carbo" className={styles.label}>탄수화물</label>
                            </div>
                            <div className={styles.relativeGroup}>
                                <input type="text" name="protein" id="protein" className={styles.inputField} placeholder=" " required />
                                <label htmlFor="protein" className={styles.label}>단백질</label>
                            </div>
                            <div className={styles.relativeGroup}>
                                <input type="text" name="fat" id="fat" className={styles.inputField} placeholder=" " required />
                                <label htmlFor="fat" className={styles.label}>지방</label>
                            </div>
                            
                            <div className={styles.gridGroup}>
                                <div className={styles.relativeGroup}>
                                </div>
                            </div>
                           
                        </form>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </div>
                </div>
            </div>

            <GNB></GNB>
        </div>
    );
}
