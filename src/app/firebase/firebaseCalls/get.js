import { database } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getInstitutes = async () => {
  const instituteRef = collection(database, "institute");

  const instituteSnapshot = await getDocs(instituteRef);
  let institutes = instituteSnapshot.docs.map((institute) => ({
    id: institute.get("institute"),
    value: institute.get("institute"),
  }));

  institutes = institutes.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );

  return institutes;
};

export const getSpecificStudent = async (rollNo) => {
  const studentRef = collection(database, "students");
  const q = query(studentRef, where("rollNo", "==", rollNo));

  const studentSnapshot = await getDocs(q);
  let students = studentSnapshot.docs.map((student) => ({
    id: student.id,
    ...student.data(),
  }));

  return students;
};

export const getSpecificBus = async (busNo, institute) => {
  const busRef = collection(database, "bus");
  const q = query(
    busRef,
    where("busNo", "==", busNo),
    where("institute", "==", institute)
  );

  const busSnapshot = await getDocs(q);
  let bus = busSnapshot.docs.map((bus) => ({
    id: bus.id,
    ...bus.data(),
  }));

  return bus;
};
