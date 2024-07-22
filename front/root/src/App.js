import React from "react";
import Main from "./components/Main";
import Frame from "./components/Frame";
import CalendarPage from "./components/CalendarPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Frame>
        <AppContent />
      </Frame>
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
