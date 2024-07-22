import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css"; // 달력 기본 스타일을 포함

function App() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const tileContent = ({ date, view }) => {
    // view는 'month' 또는 'year'일 수 있습니다.
    if (view === "month") {
      // 특정 날짜에 내용 추가
      if (date.getDate() === 15) {
        // 예: 15일에 특별한 표시
        return <div style={{ color: "red" }}>🎉</div>;
      }
    }
    return null;
  };
  const handleClickDay = (value) => {
    alert(`클릭한 날짜: ${value.toDateString()}`);
  };
  // 날짜를 숫자로만 표시하도록 tileClassName을 설정
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      return "date-tile"; // 커스터마이즈된 클래스 이름
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
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      />
      <p>선택한 날짜: {date.toDateString()}</p>
    </div>
  );
}

export default App;
