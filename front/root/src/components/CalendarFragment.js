import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css"; // 달력 기본 스타일을 포함

function App() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
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
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      />
      <p>선택한 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default App;
