import { useEffect, useState } from "react";
import addStudent from "./addStudent.jsx";
import AddStudentMenu from "./AddStudentMenu.jsx";
import ConfirmationBox from "./ConfirmationBox.jsx";
import StudentTable from "./StudentTable.jsx";

function StudentsList({ students, setStudents }) {
    const [newStudentNameInput, setNewStudentInput] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const [action, setAction] = useState("");
    let studentCount = students.filter(
        (student) => student.role == "student"
    ).length;
    let supervisorCount = students.filter(
        (student) => student.role == "supervisor"
    ).length;

    const AskConfirmationToDeleteUser = (studentName, index) => {
        document.getElementById("confirmation").style.display = "block";
        setSelectedStudent({ name: studentName, index: index });
        setAction("delete");
    };

    const addNewStudent = (gender) => {
        addStudent(students, setStudents, newStudentNameInput, gender);
        setNewStudentInput("");
    };

    return (
        <div>
            <ConfirmationBox
                selectedStudent={selectedStudent}
                students={students}
                setStudents={setStudents}
                action={action}
            />
            <AddStudentMenu
                addNewStudent={addNewStudent}
                setNewStudentInput={setNewStudentInput}
                newStudentNameInput={newStudentNameInput}
            />
            <button
                className="addStudentBtn"
                onClick={(e) => {
                    document.getElementById("myNav").style.height = "100%";
                }}
            >
                +
            </button>

            <h1 className="title">Students list</h1>

            <h2 className="subTitle">
                {studentCount} students, and {supervisorCount} supervisors
            </h2>
            <StudentTable
                students={students}
                setStudents={setStudents}
                AskConfirmationToDeleteUser={AskConfirmationToDeleteUser}
            />
        </div>
    );
}

export default StudentsList;
