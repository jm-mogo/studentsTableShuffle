import { useState } from "react";
import addStudent from "./addStudent.jsx";
import deleteStudent from "./deleteStudent.jsx";
import updateName from "./updateName.jsx";
import editStudent from "./editStudent.jsx";
import AddStudentMenu from "./AddStudentMenu.jsx";
import updateStudentRole from "./updateStudentRole.jsx";
import ConfirmationBox from "./ConfirmationBox.jsx";

function StudentsList({ students, setStudents }) {
    const [studentRole, setStudentRole] = useState("student");
    const [newStudentNameInput, setNewStudentInput] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    let studentCount = 0;
    students.map((item) => {
        item.role == studentRole ? studentCount++ : studentCount;
    });

    students.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (b.name < a.name) {
            return -1;
        }
        return 0;
    });
    console.log(students);

    const AskConfirmationToDeleteUser = (studentName) => {
        document.getElementById("confirmation").style.display = "block";
        setSelectedStudent(studentName);
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

            <div className="rolesBtn">
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
            </div>

            <h2 className="subTitle">
                There are {studentCount} {studentRole}s
            </h2>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Controls</th>
                    </tr>
                    {students.map((item, i) => {
                        return (
                            <>
                                {item.role == studentRole && (
                                    <tr>
                                        <td>
                                            {item.edit ? (
                                                <>
                                                    <div className="updateStudent">
                                                        <input
                                                            id={i}
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => {
                                                                updateName(
                                                                    e,
                                                                    students,
                                                                    setStudents
                                                                );
                                                            }}
                                                        />
                                                        <label htmlFor="role">
                                                            Role:
                                                        </label>
                                                        <select
                                                            name="role"
                                                            id="role"
                                                            onChange={(e) => {
                                                                updateStudentRole(
                                                                    e,
                                                                    i,
                                                                    students,
                                                                    setStudents
                                                                );
                                                            }}
                                                        >
                                                            <option
                                                                value="student"
                                                                selected={
                                                                    item.role ==
                                                                        "student" &&
                                                                    true
                                                                }
                                                            >
                                                                Student
                                                            </option>
                                                            <option
                                                                value="supervisor"
                                                                selected={
                                                                    item.role ==
                                                                        "supervisor" &&
                                                                    true
                                                                }
                                                            >
                                                                Supervisor
                                                            </option>
                                                        </select>
                                                    </div>
                                                </>
                                            ) : (
                                                item.name
                                            )}
                                        </td>
                                        <td className="tdButtons">
                                            <button
                                                className="deleteBtn"
                                                onClick={() => {
                                                    AskConfirmationToDeleteUser(
                                                        item.name
                                                    );
                                                }}
                                            ></button>
                                            <button
                                                className={
                                                    item.edit
                                                        ? "updateBtn"
                                                        : "editBtn"
                                                }
                                                onClick={() => {
                                                    editStudent(
                                                        i,
                                                        students,
                                                        setStudents
                                                    );
                                                }}
                                            ></button>
                                        </td>
                                    </tr>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsList;
