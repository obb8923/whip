import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일을 포함시킵니다.

function App() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      <p>선택한 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default App;
