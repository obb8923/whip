import React from "react";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
      </Routes>
    </>
  );
}

export default App;
