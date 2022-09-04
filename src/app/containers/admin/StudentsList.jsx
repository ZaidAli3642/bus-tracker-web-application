import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";

import ListItem from "../../components/ListItem";
import useAuth from "./../../context/auth/useAuth";
import Loader from "../../components/Loader";
import useSearch from "./../../hooks/useSearch";
import useApi from "../../hooks/useApi";

const StudentsList = () => {
  const navigation = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filterData, filteredData, setFilteredData } = useSearch(students);
  const { deleteDocument } = useApi();
  const { user } = useAuth();

  const getStudentsInformation = () => {
    setIsLoading(true);
    const studentCollection = collection(database, "students");

    const q = query(
      studentCollection,
      where("institute", "==", user.institute)
    );

    const unsubscribe = onSnapshot(q, (studentSnapshot) => {
      const studentsList = studentSnapshot.docs.map((student) => ({
        id: student.id,
        ...student.data(),
      }));
      setStudents(studentsList);
      setFilteredData(studentsList);
      setIsLoading(false);
    });

    return unsubscribe;
  };

  const handleDelete = (id) => {
    deleteDocument("students", id);
  };

  useEffect(() => {
    const unsubscribe = getStudentsInformation();
    return () => unsubscribe();
  }, []);

  const handleSearch = (search) => {
    filterData(search);
  };

  if (isLoading) return <Loader />;

  if (students.length === 0) return <h3>No Students Added</h3>;

  return (
    <>
      <h1>Students List</h1>
      <div class="mb-3">
        <label for="search" class="form-label">
          Search Student
        </label>
        <input
          type="search"
          class="form-control"
          id="search"
          placeholder="Search Student"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="items">
        <ol className="ps-2">
          {filteredData.map((student) => (
            <ListItem
              id={student.id}
              to={`/admin/student`}
              state={{
                id: student.id,
                rollNo: student.rollNo,
                firstname: student.firstname,
                lastname: student.lastname,
                parent: student.parent,
                institute: student.institute,
                parentcontact: student.parentcontact,
                country: student.country,
                city: student.city,
                address: student.address,
                postalcode: student.postalcode,
                contact: student.contact,
                busNo: student.busNo,
                imageName: student.imageName,
                image: student.image,
                class: student.class,
              }}
              title={`${student.firstname} ${student.lastname}`}
              onDelete={() => handleDelete(student.id)}
              onClick={() =>
                navigation("/admin/student_update/" + student.id, {
                  state: {
                    rollNo: student.rollNo,
                    firstname: student.firstname,
                    lastname: student.lastname,
                    parent: student.parent,
                    institute: student.institute,
                    parentcontact: student.parentcontact,
                    country: student.country,
                    city: student.city,
                    address: student.address,
                    postalcode: student.postalcode,
                    contact: student.contact,
                    busNo: student.busNo,
                    imageName: student.imageName,
                    image: student.image,
                    class: student.class,
                    isUpdated: true,
                  },
                })
              }
            />
          ))}
        </ol>
      </div>
    </>
  );
};

export default StudentsList;
