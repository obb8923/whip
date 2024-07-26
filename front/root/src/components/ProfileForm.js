import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../css/Profile.module.css";
import SlideBar from "../components/SlideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isSubmitted }, setValue } = useForm();

  const navigate = useNavigate(); // useNavigate 훅 사용

  const [userId, setUserId] = useState('');
  const [userGender, setUserGender] = useState('');
  const [rdProtein, setRdProtein] = useState(100);
  const [rdCarbo, setRdCarbo] = useState(200);
  const [rdFat, setRdFat] = useState(100);

  useEffect(() => {
    const storedId = localStorage.getItem('id') || '';
    const storedGender = localStorage.getItem('gender') || '';
    const storedAge = localStorage.getItem('age') || '';
    const storedHeight = localStorage.getItem('height') || '';
    const storedBodyweight = localStorage.getItem('bodyweight') || '';
    const storedActivity = localStorage.getItem('activity') || '';
    const storedPw = localStorage.getItem('pw') || '';

    setUserId(storedId);
    setUserGender(storedGender === '1' ? '남' : '여');
    setValue('id', storedId);
    setValue('gender', storedGender);
    setValue('age', storedAge);
    setValue('height', storedHeight);
    setValue('bodyweight', storedBodyweight);
    setValue('activity', storedActivity);
    setValue('pw', storedPw);

    axios.get('back/api/register', { params: { id: storedId } })
      .then(response => {
        setRdProtein(response.data.RD_PROTEIN);
        setRdCarbo(response.data.RD_CARBO);
        setRdFat(response.data.RD_FAT);
        console.log(response.data);
      })
      .catch(error => console.error("RD values fetch failed:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    const { confirmpw, ...dataToSubmit } = data;
    const dataToSend = {
      ...dataToSubmit,
      rd_protein: rdProtein,
      rd_carbo: rdCarbo,
      rd_fat: rdFat
    };
    try {
      const response = await axios.put("back/api/register", dataToSend);
      console.log(response.data);
      setRdProtein(response.data.RD_PROTEIN);
      setRdCarbo(response.data.RD_CARBO);
      setRdFat(response.data.RD_FAT);
      navigate("/");
      localStorage.setItem("age", data.age);
      localStorage.setItem("pw", data.pw);
      localStorage.setItem("height", data.height);
      localStorage.setItem("bodyweight", data.bodyweight);
      localStorage.setItem("activity", data.activity);
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  };

  const pw = watch("pw");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.formContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
      <form className={styles.formform} onSubmit={handleSubmit(onSubmit)}>
        <h2>일일 목표 섭취량</h2>

        {/* RD Values Section */}
        <div className={styles.rdGroup}>
          <SlideBar 
            label="단백질 (g)" 
            value={rdProtein} 
            onChange={(e) => setRdProtein(Number(e.target.value))} 
            onInputChange={(e) => setRdProtein(Number(e.target.value))}
            min={0}
            max={300}
          />
          <SlideBar 
            label="탄수화물 (g)" 
            value={rdCarbo} 
            onChange={(e) => setRdCarbo(Number(e.target.value))} 
            onInputChange={(e) => setRdCarbo(Number(e.target.value))}
            min={0}
            max={500}
          />
          <SlideBar 
            label="지방 (g)" 
            value={rdFat} 
            onChange={(e) => setRdFat(Number(e.target.value))} 
            onInputChange={(e) => setRdFat(Number(e.target.value))}
            min={0}
            max={150}
          />
        </div>
        <h2>내 정보 수정</h2>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="id">아이디</label>
          <input
            className={styles.formInput}
            id="id"
            type="text"
            value={userId}
            readOnly
            {...register("id", {})}
            aria-invalid={isSubmitted ? (errors.id ? "true" : "false") : undefined}
          />
          {errors.id && <small className={styles.errorMessage}>{errors.id.message}</small>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="pw">비밀번호</label>
          <input
            className={styles.formInput}
            id="pw"
            type="password"
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
          {errors.pw && <small className={styles.errorMessage}>{errors.pw.message}</small>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="confirmpw">비밀번호 확인</label>
          <input
            className={styles.formInput}
            id="confirmpw"
            type="password"
            placeholder="비밀번호 확인"
            {...register("confirmpw", {
              required: "비밀번호 확인은 필수 입니다.",
              validate: (value) => value === pw || "비밀번호가 일치하지 않습니다.",
            })}
            aria-invalid={errors.confirmpw ? "true" : "false"}
          />
          {errors.confirmpw && <small className={styles.errorMessage}>{errors.confirmpw.message}</small>}
        </div>
        <div className={styles.formGroupRow}>
          <div className={styles.formGroupHalf}>
            <label className={styles.formLabel} htmlFor="age">나이</label>
            <select
              className={styles.formInput}
              id="age"
              value={watch("age") || ""}
              onChange={(e) => setValue("age", e.target.value)}
              aria-invalid={errors.age ? "true" : "false"}
            >
              <option value="">나이 선택</option>
              {[...Array(101).keys()].map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
            {errors.age && <small className={styles.errorMessage}>{errors.age.message}</small>}
          </div>
          <div className={styles.formGroupHalf}>
            <label className={styles.formLabel} htmlFor="gender">성별</label>
            <input
              className={styles.formInput}
              id="gender"
              type="text"
              value={userGender}
              readOnly
              aria-invalid={errors.gender ? "true" : "false"}
            />
            {errors.gender && <small className={styles.errorMessage}>{errors.gender.message}</small>}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="height">키</label>
          <input
            className={styles.formInput}
            id="height"
            type="number"
            placeholder="키 입력"
            {...register("height", { required: "키는 필수 입니다." })}
            defaultValue={watch("height") || ""}
            aria-invalid={errors.height ? "true" : "false"}
          />
          {errors.height && <small className={styles.errorMessage}>{errors.height.message}</small>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="bodyweight">몸무게</label>
          <input
            className={styles.formInput}
            id="bodyweight"
            type="number"
            placeholder="몸무게 입력"
            {...register("bodyweight", { required: "몸무게는 필수 입니다." })}
            defaultValue={watch("bodyweight") || ""}
            aria-invalid={errors.bodyweight ? "true" : "false"}
          />
          {errors.bodyweight && <small className={styles.errorMessage}>{errors.bodyweight.message}</small>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="activity">활동수준</label>
          <select
            className={styles.formInput}
            id="activity"
            value={watch("activity") || ""}
            onChange={(e) => setValue("activity", e.target.value)}
            aria-invalid={errors.activity ? "true" : "false"}
          >
            <option value="">활동수준 선택</option>
            <option value="1">1 - 거의 활동하지 않음 (사무직 등)</option>
            <option value="2">2 - 가벼운 활동 (주 1-3일 가벼운 운동)</option>
            <option value="3">3 - 보통 활동 (주 3-5일 보통 운동)</option>
            <option value="4">4 - 활발한 활동 (주 6-7일 운동)</option>
            <option value="5">5 - 매우 활발한 활동 (운동 선수 등)</option>
          </select>
          {errors.activity && <small className={styles.errorMessage}>{errors.activity.message}</small>}
        </div>
        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>확인</button>
      </form>
    </div>
  );
}
