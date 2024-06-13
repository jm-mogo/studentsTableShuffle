import { useState } from "react";
import addStudent from "./addStudent.jsx";
import deleteStudent from "./deleteStudent.jsx";
// import "./studentList.css";

function StudentsList({ students, setStudents, studentRole }) {
    const [newStudentNameInput, setNewStudentInput] = useState("");
    let studentCount = 0;
    students.map((item) => {
        item.role == studentRole ? studentCount++ : studentCount;
    });

    const addNewStudent = () => {
        addStudent(students, setStudents, newStudentNameInput, studentRole);
        setNewStudentInput("");
    };

    const editStudent = (studentName) => {
        let newStudentsList = [];
        newStudentsList.push(...students);
        newStudentsList.map((student) => {
            if (student.name == studentName) {
                student.edit ? (student.edit = false) : (student.edit = true);
            }
        });
        setStudents(newStudentsList);
    };

    const updateName = (e) => {
        let index = e.target.id;
        let newStudentsList = [];
        newStudentsList.push(...students);
        newStudentsList[index].name = e.target.value;
        setStudents(newStudentsList);
    };

    return (
        <div>
            <div>
                <label htmlFor="newStudent">Add new student</label>
                <input
                    onChange={(e) => {
                        setNewStudentInput(e.target.value);
                    }}
                    type="text"
                    name="newStudent"
                    id="newStudent"
                    value={newStudentNameInput}
                />
                <button type="button" onClick={addNewStudent}>
                    Add
                </button>
            </div>
            <h1>
                There are {studentCount} {studentRole}s
            </h1>

            <table>
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
                                            onChange={updateName}
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
                                        className="editBtn"
                                        onClick={() => {
                                            editStudent(item.name);
                                        }}
                                    ></button>
                                </td>
                            </tr>
                        )}
                    </>
                ))}
            </table>
        </div>
    );
}

export default StudentsList;
