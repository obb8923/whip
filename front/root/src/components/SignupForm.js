import React from "react";
import { useForm } from "react-hook-form";
import styles from "../css/LoginForm.module.css";
import axios from "axios";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (formData) => {
    // 비밀번호 확인을 위한 필드는 formData에서 제거
    const { confirmPassword, ...dataToSubmit } = formData;
    console.log(dataToSubmit); // 데이터 확인용
    try {
      // 회원가입 요청을 보내는 부분
      const response = await axios.post("back/api/register", dataToSubmit);
      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  };

  // 비밀번호 확인용 watch
  const password = watch("password");

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>회원가입하세요</h2>
        <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="username">
              아이디
            </label>
            <input
              className={styles.formInput}
              id="username"
              type="text"
              placeholder="아이디 입력"
              {...register("username", {
                required: "아이디는 필수 입니다.",
              })}
              aria-invalid={
                isSubmitted ? (errors.username ? "true" : "false") : undefined
              }
            />
            {errors.username && (
              <small className={styles.errorMessage}>
                {errors.username.message}
              </small>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              비밀번호
            </label>
            <input
              className={styles.formInput}
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              {...register("password", {
                required: "비밀번호는 필수 입니다.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <small className={styles.errorMessage}>
                {errors.password.message}
              </small>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="confirmPassword">
              비밀번호 확인
            </label>
            <input
              className={styles.formInput}
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수 입니다.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <small className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
          <div className={styles.formGroupRow}>
            <div className={styles.formGroupHalf}>
              <label className={styles.formLabel} htmlFor="age">
                나이
              </label>
              <select
                className={styles.formInput}
                id="age"
                {...register("age", {
                  required: "나이는 필수 입니다.",
                })}
                aria-invalid={errors.age ? "true" : "false"}
              >
                <option value="">나이 선택</option>
                {[...Array(101).keys()].map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
              {errors.age && (
                <small className={styles.errorMessage}>
                  {errors.age.message}
                </small>
              )}
            </div>
            <div className={styles.formGroupHalf}>
              <label className={styles.formLabel} htmlFor="gender">
                성별
              </label>
              <select
                className={styles.formInput}
                id="gender"
                {...register("gender", {
                  required: "성별은 필수 입니다.",
                })}
                aria-invalid={errors.gender ? "true" : "false"}
              >
                <option value="">성별 선택</option>
                <option value="1">남</option>
                <option value="0">여</option>
              </select>
              {errors.gender && (
                <small className={styles.errorMessage}>
                  {errors.gender.message}
                </small>
              )}
            </div>
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
            {errors.height && (
              <small className={styles.errorMessage}>
                {errors.height.message}
              </small>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="weight">
              몸무게
            </label>
            <input
              className={styles.formInput}
              id="weight"
              type="number"
              placeholder="몸무게 입력"
              {...register("weight", {
                required: "몸무게는 필수 입니다.",
              })}
              aria-invalid={errors.weight ? "true" : "false"}
            />
            {errors.weight && (
              <small className={styles.errorMessage}>
                {errors.weight.message}
              </small>
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="activityLevel">
              활동수준
            </label>
            <select
              className={styles.formInput}
              id="activityLevel"
              {...register("activityLevel", {
                required: "활동수준은 필수 입니다.",
              })}
              aria-invalid={errors.activityLevel ? "true" : "false"}
            >
              <option value="">활동수준 선택</option>
              <option value="1">1 - 거의 활동하지 않음 (사무직 등)</option>
              <option value="2">2 - 가벼운 활동 (주 1-3일 가벼운 운동)</option>
              <option value="3">3 - 보통 활동 (주 3-5일 보통 운동)</option>
              <option value="4">4 - 활발한 활동 (주 6-7일 운동)</option>
              <option value="5">5 - 매우 활발한 활동 (운동 선수 등)</option>
            </select>
            {errors.activityLevel && (
              <small className={styles.errorMessage}>
                {errors.activityLevel.message}
              </small>
            )}
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
