import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState([[]]);

  useEffect(() => {
    // activeStartDate가 Date 객체인지 확인
    const startDate = new Date(activeStartDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    console.log(year, month);
    // POST 요청을 보냅니다.
    axios
      .post("/back/api/monthly", { year, month })
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
      const day = date.getDate() - 1; // 0부터 시작하는 배열 인덱스에 맞게 조정
      const dataCount = monthlyData[day]?.length || 0;

      if (dataCount > 0) {
        return (
          <div className="tile-content">
            <div className="dot" title={`${dataCount} items`} />
            {dataCount}
          </div>
        );
      }
    }
    return null;
  };

  const handleClickDay = (value) => {
    alert(`클릭한 날짜: ${value.toDateString()}`);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return "date-tile";
    }
    return null;
  };

  return (
    <div>
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
      <p>선택한 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default App;
