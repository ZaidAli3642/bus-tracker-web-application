import ListItem from "../components/ListItem";

const studentsList = [
  { id: 1, studentName: "Student 1", to: `/admin/student` },
  { id: 2, studentName: "Student 2", to: `/admin/student` },
  { id: 3, studentName: "Student 3", to: `/admin/student` },
  { id: 4, studentName: "Student 4", to: `/admin/student` },
  { id: 5, studentName: "Student 5", to: `/admin/student` },
  { id: 6, studentName: "Student 6", to: `/admin/student` },
];

const StudentsList = () => {
  return (
    <>
      <h1>Students List</h1>
      <div className="items">
        {studentsList.map((student) => (
          <ListItem
            id={student.id}
            to={student.to}
            title={student.studentName}
          />
        ))}
      </div>
    </>
  );
};

export default StudentsList;
