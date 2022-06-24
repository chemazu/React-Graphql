import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Provider from "./context/Context";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";
import Register from "./view/Register";

function App() {
  return (
    <Provider>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
