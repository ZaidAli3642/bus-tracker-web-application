import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";

import ListItem from "../components/ListItem";
import useAuth from "./../context/auth/useAuth";

const studentsList = [
  { id: 1, studentName: "Student 1", to: `/admin/student` },
  { id: 2, studentName: "Student 2", to: `/admin/student` },
  { id: 3, studentName: "Student 3", to: `/admin/student` },
  { id: 4, studentName: "Student 4", to: `/admin/student` },
  { id: 5, studentName: "Student 5", to: `/admin/student` },
  { id: 6, studentName: "Student 6", to: `/admin/student` },
];

const StudentsList = () => {
  const navigation = useNavigate();
  const [students, setStudents] = useState([]);
  const { user } = useAuth();

  const getStudentsInformation = () => {
    const studentCollection = collection(database, "students");

    const q = query(studentCollection, where("admin_id", "==", user.admin_id));

    const unsubscribe = onSnapshot(q, (studentSnapshot) => {
      const studentsList = studentSnapshot.docs.map((student) => ({
        id: student.id,
        ...student.data(),
      }));
      setStudents(studentsList);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getStudentsInformation();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>Students List</h1>
      <div className="items">
        {students.map((student) => (
          <ListItem
            id={student.id}
            to={`/admin/student`}
            state={{
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
            }}
            title={`${student.firstname} ${student.lastname}`}
            onClick={() =>
              navigation("/admin/student_update/" + student.id, {
                state: {
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
                  isUpdated: true,
                },
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default StudentsList;
