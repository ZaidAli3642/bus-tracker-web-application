import "./main.css";
import AdminPanel from "./app/containers/AdminPanel";
import Sidebar from "./app/containers/Sidebae";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <main className="admin-panel row">
        <Sidebar />
        <AdminPanel />
      </main>
    </div>
  );
}

export default App;
