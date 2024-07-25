import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { ClipLoader } from "react-spinners";

export default function CalendarFragment() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState({});
  const [monthlyAdvice, setMonthlyAdvice] = useState("");
  const [monthlyP, setMonthlyP] = useState({});
  const [shouldShowSummaryButton, setShouldShowSummaryButton] = useState(false);
  const [loading, setLoading] = useState(0);

  const fetchMonthlyData = async (UID, year, month) => {
    try {
      setLoading((prev) => prev + 1);
      const response = await axios.post("/back/api/food/quarterly", {
        UID,
        year,
        month,
      });
      console.log("달정보 받기:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly data:", error);
      throw error;
    } finally {
      setLoading((prev) => prev - 1);
    }
  };

  const fetchMonthlyAdvice = async (UID, year, month) => {
    try {
      setLoading((prev) => prev + 1);
      const response = await axios.post("/back/api/food/advice", {
        UID,
        year,
        month,
      });
      console.log("조언 받기:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly advice:", error);
      throw error;
    } finally {
      setLoading((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const startDate = new Date(activeStartDate);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const UID = localStorage.getItem("id");

    const fetchData = async () => {
      try {
        setLoading(true);
        const [monthlyData, monthlyAdvice] = await Promise.all([
          fetchMonthlyData(UID, year, month),
          fetchMonthlyAdvice(UID, year, month),
        ]);
        setMonthlyData(monthlyData);
        setMonthlyAdvice(monthlyAdvice.advice);
        setMonthlyP(monthlyAdvice.averages);
      } catch (error) {
        // 에러 처리
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 현재 날짜와 비교하여 shouldShowSummaryButton 상태 업데이트
    const today = new Date();
    const isPreviousMonth =
      startDate.getFullYear() < today.getFullYear() ||
      (startDate.getFullYear() === today.getFullYear() &&
        startDate.getMonth() < today.getMonth());
    setShouldShowSummaryButton(isPreviousMonth);
  }, [activeStartDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(new Date(activeStartDate));
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDate() - 1;
      const monthKey = moment(date).format("YYYY-MM");
      const data = monthlyData[monthKey] || {};
      const dataCount = data.foods ? data.foods[day]?.length || 0 : 0;
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      return (
        <div className="tile-content">
          {dataCount > 0 && <div className="dot">{dataCount}</div>}
        </div>
      );
    }
    return null;
  };

  const handleClickDay = (value) => {
    const formattedDate = moment(value).format("YYYY-MM-DD");
    const year = moment(value).format("YYYY");
    const month = moment(value).format("MM");
    const day = moment(value).format("DD");
    const monthKey = `${year}-${month}`;
    const dayData = (monthlyData[monthKey]?.foods || [])[day - 1] || [];
    const percentages =
      (monthlyData[monthKey]?.percentages || [])[day - 1] || {};

    navigate(`/calendar/${formattedDate}`, {
      state: { dayData, percentages, year, month, day },
    });
  };

  const handleClickButton = () => {
    const year = moment(activeStartDate).format("YYYY");
    const month = moment(activeStartDate).format("MM");
    const monthKey = `${year}-${month}`;
    const monthData = monthlyData[monthKey] || {};

    navigate(`/calendar/summary/${year}/${month}`, {
      state: { monthData, year, month, monthlyAdvice, monthlyP },
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return "date-tile";
    }
    return null;
  };

  return (
    <div>
      <h2>날짜 별로 보기</h2>
      {loading > 0 && (
        <div className="overlay">
          <ClipLoader />
        </div>
      )}
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
        onClickDay={handleClickDay}
        tileClassName={tileClassName}
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        onActiveStartDateChange={handleActiveStartDateChange}
        disabled={loading} // Loading 상태일 때 날짜 선택 불가능
      />
      <button
        className={`monthlyButton ${!shouldShowSummaryButton ? "hidden" : ""}`}
        onClick={handleClickButton}
        disabled={loading} // Loading 상태일 때 버튼 비활성화
      >
        한 달 요약 보기
      </button>
    </div>
  );
}
