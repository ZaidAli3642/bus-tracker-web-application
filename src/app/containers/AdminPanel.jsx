import { Routes, Route } from "react-router-dom";
import DriversList from "./DriversList";
import BusLists from "./BusLists";
import DriverDetails from "./DriverDetails";
import BusDetails from "./BusDetails";
import Home from "./Home";
import UpdateAdminInfo from "./UpdateAdminInfo";
import StudentsList from "./StudentsList";
import StudentDetails from "./StudentDetails";
import UpdateStudentInfo from "./UpdateStudentInfo";

const AdminPanel = () => {
  return (
    <div className="col-10">
      <div className="admin">
        <>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/admin/:id" element={<UpdateAdminInfo />} />
            <Route path="/student_update/:id" element={<UpdateStudentInfo />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/student" element={<StudentsList />} />
            <Route path="/driver/:id" element={<DriverDetails />} />
            <Route path="/driver" element={<DriversList />} />
            <Route path="/bus/:id" element={<BusDetails />} />
            <Route path="/bus" element={<BusLists />} />
          </Routes>
        </>
      </div>
    </div>
  );
};

export default AdminPanel;
