import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

export default function CalendarFragment() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState([[]]);

  useEffect(() => {
    const startDate = new Date(activeStartDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const UID = localStorage.getItem("id");
    console.log(UID);
    console.log(year, month);
    axios
      .post("/back/api/monthly", { UID, year, month })
      .then((response) => {
        console.log("Data received:", response.data);
        setMonthlyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
      const dataCount = monthlyData[day]?.length || 0;
      const today = new Date();
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      return (
        <div className="tile-content">
          {/* {isToday && <div className="dot2"></div>} */}
          {dataCount > 0 && <div className="dot">{dataCount}</div>}
        </div>
      );
    }
    return null;
  };

  const handleClickDay = (value) => {
    const formattedDate = moment(value).format("YYMMDD");
    const year = moment(value).format("YYYY");
    const month = moment(value).format("MM");
    const day = moment(value).format("DD");
    const dayData = monthlyData[day - 1];

    navigate(`/calendar/${formattedDate}`, {
      state: { dayData, year, month, day },
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
      />
    </div>
  );
}
