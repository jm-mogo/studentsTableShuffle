import { useState } from "react";
import addStudent from "./addStudent.jsx";
import deleteStudent from "./deleteStudent.jsx";
import updateName from "./updateName.jsx";
import editStudent from "./editStudent.jsx";
import AddStudentMenu from "./AddStudentMenu.jsx";

function StudentsList({ students, setStudents, studentRole }) {
    const [newStudentNameInput, setNewStudentInput] = useState("");
    let studentCount = 0;
    students.map((item) => {
        item.role == studentRole ? studentCount++ : studentCount;
    });

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
            <AddStudentMenu
                addNewStudent={addNewStudent}
                setNewStudentInput={setNewStudentInput}
                studentRole={studentRole}
                newStudentNameInput={newStudentNameInput}
            />
            <button
                onClick={(e) => {
                    document.getElementById("myNav").style.height = "100%";
                }}
            >
                Add Student
            </button>
            <h1>
                There are {studentCount} {studentRole}s
            </h1>

            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Controls</th>
                    </tr>
                    {students.map((item, i) => (
                        <>
                            {item.role == studentRole && (
                                <tr>
                                    <td>
                                        {item.edit ? (
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
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td className="tdButtons">
                                        <button
                                            className="deleteBtn"
                                            onClick={() => {
                                                deleteStudent(
                                                    students,
                                                    setStudents,
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
                                                    item.name,
                                                    students,
                                                    setStudents
                                                );
                                            }}
                                        ></button>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsList;
