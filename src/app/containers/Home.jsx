import Sidebar from "./Sidebae";
import AdminPanel from "./AdminPanel";

const Home = () => {
  return (
    <main className="admin-panel row">
      <Sidebar />
      <AdminPanel />
    </main>
  );
};

export default Home;
