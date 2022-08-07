import ListItem from "../components/ListItem";

const studentsList = [
  { id: 1, studentName: "Student 1", to: `/student` },
  { id: 2, studentName: "Student 2", to: `/student` },
  { id: 3, studentName: "Student 3", to: `/student` },
  { id: 4, studentName: "Student 4", to: `/student` },
  { id: 5, studentName: "Student 5", to: `/student` },
  { id: 6, studentName: "Student 6", to: `/student` },
];

const StudentsList = () => {
  return (
    <>
      <div className="admin">
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
      </div>
    </>
  );
};

export default StudentsList;
