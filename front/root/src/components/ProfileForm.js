import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../css/LoginForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ProfileForm() {
  const [UID] = useState(localStorage.getItem("id"));
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    setValue, // setValue를 사용하여 confirmpw 값을 초기화하거나 제거할 수 있습니다.
  } = useForm();

  const onSubmit = async (formData) => {};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>회원정보 확인</h2>
        <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
          <div>아이디 {UID}</div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="age">
              나이
            </label>
            <input
              className={styles.formInput}
              id="age"
              type="number"
              placeholder="나이 입력"
              {...register("age", {
                required: "나이는 필수 입니다.",
                min: {
                  value: 1,
                  message: "나이는 1 이상이어야 합니다.",
                },
              })}
              aria-invalid={errors.age ? "true" : "false"}
            />
            {/* {errors.age && <small>{errors.age.message}</small>} */}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="height">
              키
            </label>
            <input
              className={styles.formInput}
              id="height"
              type="number"
              placeholder="키 입력"
              {...register("height", {
                required: "키는 필수 입니다.",
              })}
              aria-invalid={errors.height ? "true" : "false"}
            />
            {/* {errors.height && <small>{errors.height.message}</small>} */}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="bodyweight">
              몸무게
            </label>
            <input
              className={styles.formInput}
              id="bodyweight"
              type="number"
              placeholder="몸무게 입력"
              {...register("bodyweight", {
                required: "몸무게는 필수 입니다.",
              })}
              aria-invalid={errors.bodyweight ? "true" : "false"}
            />
            {/* {errors.bodyweight && <small>{errors.bodyweight.message}</small>} */}
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
