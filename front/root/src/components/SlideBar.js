import React, { useRef, useEffect } from 'react';
import styles from '../css/SlideBar.module.css';

export default function SlideBar({ label, value, onChange, min = 0, max = 100, onInputChange }) {
  const sliderRef = useRef(null);

  const updateSliderBackground = () => {
    if (sliderRef.current) {
      const percent = ((value - min) / (max - min)) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    }
  };

  useEffect(() => {
    updateSliderBackground();
  }, [value, min, max]);

  const handleSliderChange = (e) => {
    onChange(e);
    updateSliderBackground();
  };

  return (
    <div className={styles.slideBarContainer}>
      <label className={styles.slideBarLabel}>{label}</label>
      <div className={styles.slideBarBox}>
        <input
          ref={sliderRef}
          type="range"
          className={styles.slideBarSlider}
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
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
    </div>
  );
}