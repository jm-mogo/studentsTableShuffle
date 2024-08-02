import { useEffect, useState } from "react";
import addStudent from "./addStudent.jsx";
import deleteStudent from "./deleteStudent.jsx";
import updateName from "./updateName.jsx";
import editStudent from "./editStudent.jsx";
import AddStudentMenu from "./AddStudentMenu.jsx";
import updateStudentRole from "./updateStudentRole.jsx";
import ConfirmationBox from "./ConfirmationBox.jsx";
import StudentTable from "./StudentTable.jsx";
import { ConstructionOutlined } from "@mui/icons-material";

function StudentsList({ students, setStudents }) {
    const [studentRole, setStudentRole] = useState("student");
    const [newStudentNameInput, setNewStudentInput] = useState("");
    const [selectedStudent, setSelectedStudent] = useState({});
    const [action, setAction] = useState("");
    let studentCount = 0;
    students.map((item) => {
        item.role == studentRole ? studentCount++ : studentCount;
    });

    // students.sort(function (a, b) {
    //     if (a.name < b.name) {
    //         return -1;
    //     }
    //     if (b.name > a.name) {
    //         return 1;
    //     }
    //     return 0;
    // });

    const AskConfirmationToDeleteUser = (studentName, index) => {
        document.getElementById("confirmation").style.display = "block";
        setSelectedStudent({ name: studentName, index: index });
        setAction("delete");
    };

    const addNewStudent = (gender) => {
        addStudent(
            students,
            setStudents,
            newStudentNameInput,
            studentRole,
            gender
        );
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
                studentRole={studentRole}
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

            {/* <div className="rolesBtn">
                <button
                    className={studentRole == "student" ? "selectedMenu" : ""}
                    onClick={() => {
                        setStudentRole("student");
                    }}
                >
                    Students
                </button>
                <button
                    className={
                        studentRole == "supervisor" ? "selectedMenu" : ""
                    }
                    onClick={() => {
                        setStudentRole("supervisor");
                    }}
                >
                    Supervisors
                </button>
            </div> */}

            <h2 className="subTitle">
                There are {studentCount} {studentRole}s
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
