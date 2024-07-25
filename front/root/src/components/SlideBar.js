import React from 'react';
import styles from '../css/SlideBar.module.css';

export default function SlideBar({ label, value, onChange, min = 0, max = 100, onInputChange }) {
  return (
    <div className={styles.slideBarContainer}>
      <label className={styles.slideBarLabel}>{label}</label>
      <input
        type="range"
        className={styles.slideBarSlider}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <input
        type="text"
        className={styles.slideBarInput}
        min={min}
        max={max}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
}
