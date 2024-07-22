import React from "react";
import Main from "./components/Main";
import CalendarPage from "./components/CalendarPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
