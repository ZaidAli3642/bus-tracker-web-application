import { Routes, Route, Navigate } from "react-router-dom";
import DriversList from "./DriversList";
import BusLists from "./BusLists";
import DriverDetails from "./DriverDetails";
import BusDetails from "./BusDetails";
import UpdateAdminInfo from "./UpdateAdminInfo";
import StudentsList from "./StudentsList";
import StudentDetails from "./StudentDetails";
import NotFound from "../NotFound";
import Admin from "./Admin";
import Location from "./Location";
import BusInformationForm from "./BusInformationForm";
import DriverInformationForm from "./DriverInformationForm";
import StudentInformationForm from "./StudentInformationForm";

const AdminPanel = () => {
  return (
    <div className="col-10">
      <div className="admin">
        <>
          <Routes>
            <Route path="/home" element={<Admin />} />
            <Route path="/admin_update/:id" element={<UpdateAdminInfo />} />
            <Route
              path="/student_update/:id"
              element={<StudentInformationForm />}
            />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/student" element={<StudentsList />} />
            <Route
              path="/driver_update/:id"
              element={<DriverInformationForm />}
            />
            <Route path="/driver/:id" element={<DriverDetails />} />
            <Route path="/driver" element={<DriversList />} />
            <Route path="/bus_update/:id" element={<BusInformationForm />} />
            <Route path="/bus/:id" element={<BusDetails />} />
            <Route path="/bus" element={<BusLists />} />
            <Route path="/location" element={<Location />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </>
      </div>
    </div>
  );
};

export default AdminPanel;
