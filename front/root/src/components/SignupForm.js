import React from "react";
import { useForm } from "react-hook-form";
import styles from "../css/LoginForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted },
    setValue, // setValue를 사용하여 confirmpw 값을 초기화하거나 제거할 수 있습니다.
  } = useForm();

  const onSubmit = async (formData) => {
    // 비밀번호 확인을 위한 필드는 formData에서 제거
    const { confirmpw, ...dataToSubmit } = formData;

    try {
      // 회원가입 요청을 보내는 부분
      const response = await axios.post("back/api/register", dataToSubmit);
      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공");
      localStorage.setItem("id", formData.id);

      navigate(`/`);
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  };

  // 비밀번호 확인용 watch
  const pw = watch("pw");

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>회원가입하세요</h2>
        <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="id">
              아이디
            </label>
            <input
              className={styles.formInput}
              id="id"
              type="text"
              placeholder="아이디 입력"
              {...register("id", {
                required: "아이디는 필수 입니다.",
              })}
              aria-invalid={
                isSubmitted ? (errors.id ? "true" : "false") : undefined
              }
            />
            {/* {errors.id && <small>{errors.id.message}</small>} */}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="pw">
              비밀번호
            </label>
            <input
              className={styles.formInput}
              id="pw"
              type="pw"
              placeholder="비밀번호 입력"
              {...register("pw", {
                required: "비밀번호는 필수 입니다.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다.",
                },
              })}
              aria-invalid={errors.pw ? "true" : "false"}
            />
            {/* {errors.pw && <small>{errors.pw.message}</small>} */}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="confirmpw">
              비밀번호 확인
            </label>
            <input
              className={styles.formInput}
              id="confirmpw"
              type="pw"
              placeholder="비밀번호 확인"
              {...register("confirmpw", {
                required: "비밀번호 확인은 필수 입니다.",
                validate: (value) =>
                  value === pw || "비밀번호가 일치하지 않습니다.",
              })}
              aria-invalid={errors.confirmpw ? "true" : "false"}
            />
            {/* {errors.confirmpw && (
              <small>{errors.confirmpw.message}</small>
            )} */}
          </div>
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
