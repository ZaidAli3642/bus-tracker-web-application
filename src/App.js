import "./main.css";
import AdminPanel from "./app/AdminPanel";
import Sidebar from "./app/Sidebae";

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
