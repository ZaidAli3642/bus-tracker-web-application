import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import _ from "lodash";
import { orderBy } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader";
import TableHeader from "../../components/TableHeader";
import useAuth from "../../context/auth/useAuth";
import { database } from "../../firebase/firebaseConfig";

export default function AttendanceRecord() {
  const [students, setStudents] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [searching, setSearching] = useState("default");
  const [dateFilter, setDateFilter] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "rollNo",
    order: "asc",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const tableHeader = [
    { id: 1, label: "#" },
    { id: 2, label: "Reg no", key: "rollNo" },
    { id: 3, label: "Student name", key: "firstname" },
    { id: 4, label: "Driver Name", key: "driverName" },
    { id: 5, label: "bus No", key: "busNo" },
    { id: 6, label: "Time", key: "timeOnAndOffBoard" },
    { id: 7, label: "status", key: "onAndOffBoard" },
  ];
  const tableHeader1 = [
    { id: 1, label: "#" },
    { id: 2, label: "Reg no", key: "rollNo" },
    { id: 3, label: "Student name", key: "firstname" },
    { id: 4, label: "Driver Name", key: "driverName" },
    { id: 5, label: "bus No", key: "busNo" },
    { id: 6, label: "Date", key: "date" },
    {
      id: 7,
      label: "School Opening(on/off) Board",
      key: "openingTime.onBoard",
    },
    {
      id: 7,
      label: "School Opening(on/off) Board",
      key: "closingTime.offBoard",
    },
  ];

  const handleSort = (path) => {
    const sortColumnCopy = { ...sortColumn };
    if (path === sortColumnCopy.path) {
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    console.log("Sort COlumn : ", sortColumnCopy);
    setSortColumn(sortColumnCopy);
  };

  const getAllDrivers = async () => {
    const driverCollection = collection(database, "drivers");

    const q = query(driverCollection, where("institute", "==", user.institute));

    const driverSnapshot = await getDocs(q);
    const drivers = driverSnapshot.docs.map((drivers) => ({
      id: drivers.id,
      ...drivers.data(),
    }));
    setDrivers(drivers);
  };

  const getStudents = async () => {
    try {
      await getAllDrivers();

      const date = new Date().toLocaleDateString("en-GB");

      const studentCollection = collection(database, "students");
      const q = query(
        studentCollection,
        where("institute", "==", user.institute),
        where("date", "==", date)
      );

      const studentSnapshot = await getDocs(q);
      //   onSnapshot(q, (studentSnapshot) => {

      //   });
      const students = studentSnapshot.docs.map((student) => ({
        id: student.id,
        ...student.data(),
      }));
      setStudents(students);
      setFilteredStudent(students);
      console.log("Students fee management : ", students);
    } catch (error) {
      console.log("ERROR : ", error);
      setLoading(false);
    }
  };

  const searchStudent = (search) => {
    if (search) {
      setFilteredStudent(students);
      const filtered = filteredStudent.filter((data) => {
        if (searching === "busNo") {
          return data.busNo === search;
        } else if (searching === "firstname") {
          return data.firstname.toLowerCase().includes(search.toLowerCase());
        }

        return data.rollNo.toString().startsWith(search);
      });

      setFilteredStudent(filtered);
      console.log("Search : ", filteredStudent, search);
    } else {
      setFilteredStudent(students);
    }
  };

  const getDataFromMonth = async (e) => {
    setDateFilter(false);
    if (!e.target.value) return setFilteredStudent(students);
    const month = new Date(e.target.value).getMonth();
    const year = new Date(e.target.value).getFullYear();
    const attendanceCollection = collection(database, "attendance");
    const q = query(
      attendanceCollection,
      where("institute", "==", user.institute),
      where("month", "==", String(month + 1)),
      where("year", "==", year)
    );

    const attendanceSnapshot = await getDocs(q);
    const attendance = attendanceSnapshot.docs.map((attendance) => ({
      id: attendance.id,
      ...attendance.data(),
    }));

    console.log("Attendance : ", attendance);
    setDateFilter(true);
    setFilteredStudent(attendance);
  };

  useEffect(() => {
    getStudents();
  }, [user]);

  if (loading) return <Loader />;

  const orderedData = _.orderBy(
    filteredStudent,
    [sortColumn.path],
    [sortColumn.order]
  );

  return (
    <div className="mt-5">
      <h1>Attendance Record</h1>
      <div class="mb-3">
        <label for="search" class="form-label">
          Search Student
        </label>
        <div style={{ display: "flex" }}>
          <input
            type="search"
            className="form-control w-50"
            id="search"
            placeholder="Search Student"
            onChange={(e) => searchStudent(e.target.value)}
          />
          <select
            className="form-select w-25 ms-3"
            aria-label="Default select example"
            onChange={(e) => setSearching(e.target.value)}
          >
            <option selected value="regNo">
              By Reg No
            </option>
            <option value="firstname">By Name</option>
            <option value="busNo">By Bus No</option>
          </select>
        </div>

        <input
          placeholder="Select Date"
          type="month"
          id="exampleColorInput"
          className="mt-2 w-25"
          onChange={(e) => getDataFromMonth(e)}
        ></input>
      </div>
      <div className="items">
        <table class="table">
          <TableHeader
            data={!dateFilter ? tableHeader : tableHeader1}
            onSort={handleSort}
          />
          {!dateFilter ? (
            <tbody>
              {orderedData.map((student, index) => {
                let driverName = "";
                drivers.forEach((driver) =>
                  driver.busNo === student.busNo
                    ? (driverName = driver.firstname)
                    : ""
                );
                return (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.rollNo}</td>
                    <td>{student.firstname}</td>
                    <td>{driverName}</td>
                    <td>{student.busNo}</td>
                    <td>
                      {student.timeOnAndOffBoard
                        ? student.timeOnAndOffBoard.toDate().toString()
                        : "none"}
                    </td>
                    <td>{student.onAndOffBoard ? "ON Board" : "Off Board"}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {orderedData.map((student, index) => {
                console.log("Student : ", student);
                let driverName = "";
                drivers.forEach((driver) =>
                  driver.busNo === student.busNo
                    ? (driverName = driver.firstname)
                    : ""
                );
                return (
                  <tr key={student.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{student.rollNo}</td>
                    <td>{student.firstname}</td>
                    <td>{student?.driverName}</td>
                    <td>{student.busNo}</td>
                    <td>{student.date || "none"}</td>
                    <td>
                      {student?.openingTime?.onBoard.includes("0:00")
                        ? "A"
                        : `${student?.openingTime?.onBoard || "none"} - ${
                            student?.openingTime?.offBoard || "none"
                          }`}
                    </td>
                    <td>
                      {student?.openingTime?.onBoard.includes("0:00")
                        ? "A"
                        : `${student?.closingTime?.onBoard || "none"} - ${
                            student?.closingTime?.offBoard || "none"
                          }`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
