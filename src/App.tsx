import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </div>
  );
}

export default App;
