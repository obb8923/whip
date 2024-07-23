import React from "react";
import { useForm } from "react-hook-form";
import styles from "../css/LoginForm.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      // 로그인 요청을 보내는 부분
      const response = await axios.post("back/api/login", formData);
      console.log("로그인 성공:", response.data);
      localStorage.setItem("id", formData.id);
      navigate(`/`);
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      // setError('id', { message: '로그인 실패. 아이디나 비밀번호를 확인해 주세요.' });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>로그인 하세요</h2>
        <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              아이디
            </label>
            <input
              className={styles.formInput}
              id="email"
              type="text"
              autoComplete="email"
              placeholder="아이디 입력"
              {...register("id", {
                required: "아이디는 필수 입니다.",
                validate: (value) => value !== "admi" || "Nice try!",
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? "true" : "false") : undefined
              }
            />
            {errors.id && <p>{errors.id.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              비밀번호
            </label>
            <input
              className={styles.formInput}
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="비밀번호 입력"
              {...register("password", {
                required: "비밀번호는 필수 입니다.",
                minLength: {
                  value: 1,
                  message: "비밀번호는 2자 이상입니다.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className={styles.submitButton} type="submit">
            로그인
          </button>
        </form>
        <p className={styles.signupLink}>
          처음이신가요?
          <Link className={styles.signupLinkText} to="/signup">
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
