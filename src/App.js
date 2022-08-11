import "./main.css";

import Login from "./app/containers/Login";
import Register from "./app/containers/Register";
import Home from "./app/containers/Home";

import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./app/containers/NotFound";

function App() {
  return (
    <div className="container">
      <>
        <Routes>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/*" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
