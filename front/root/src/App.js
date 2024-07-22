import React from "react";
import GNB from "./components/GNB";
import Main from "./components/Main";
import Frame from "./components/Frame";
import CalendarPage from "./components/CalendarPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <Frame>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <GNB />
    </Frame>
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
