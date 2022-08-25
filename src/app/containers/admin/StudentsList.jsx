import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";

import ListItem from "../../components/ListItem";
import useAuth from "./../../context/auth/useAuth";
import Loader from "../../components/Loader";

const StudentsList = () => {
  const navigation = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getStudentsInformation();
    return () => unsubscribe();
  }, []);

  if (isLoading) return <Loader />;

  if (students.length === 0) return <h3>No Students Added</h3>;

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
