import React from "react";
import { useForm } from "react-hook-form";
import styles from "../css/LoginForm.module.css";
export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (formData) => {};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>회원가입하세요</h2>
        <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              이름
            </label>
            <input
              className={styles.formInput}
              id="name"
              type="text"
              autoComplete="email"
              placeholder="이름 입력"
              {...register("id", {
                required: "이름은 필수 입니다.",
                validate: (value) => value !== "admi" || "Nice try!",
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? "true" : "false") : undefined
              }
            />
            {errors.id && <p>{errors.id.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="age">
              나이
            </label>
            <input
              className={styles.formInput}
              id="age"
              type="text"
              autoComplete="current-password"
              required
              placeholder="나이 입력"
              {...register("password", {
                required: "나이는 필수 입니다.",
                minLength: {
                  value: 1,
                  message: "나이는 2자 이상입니다.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="height">
              키
            </label>
            <input
              className={styles.formInput}
              id="height"
              type="text"
              autoComplete="current-password"
              required
              placeholder="키 입력"
              {...register("password", {
                required: "키는 필수 입니다.",
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="weight">
              몸무게
            </label>
            <input
              className={styles.formInput}
              id="weight"
              type="text"
              autoComplete="current-password"
              required
              placeholder="몸무게 입력"
              {...register("password", {
                required: "몸무게는 필수 입니다.",
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className={styles.submitButton} type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
