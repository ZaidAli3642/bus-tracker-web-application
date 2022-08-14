import Sidebar from "./Sidebae";
import AdminPanel from "./AdminPanel";
import useAuth from "./../context/auth/useAuth";

const Home = () => {
  const { user } = useAuth();

  if (user === null) {
    return null;
  }

  return (
    <main className="admin-panel row">
      <Sidebar />
      <AdminPanel />
    </main>
  );
};

export default Home;
