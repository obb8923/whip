import React from "react";
import Main from "./components/home/Main";
import CalendarPage from "./components/CalendarPage";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Day from "./components/Day";
import Month from "./components/Month";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar/:day" element={<Day />} />
        <Route path="/calendar/summary/:year/:month" element={<Month />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
