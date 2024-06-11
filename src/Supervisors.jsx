import { useState } from "react";
import addStudent from "./addStudent";

function Supervisors({ students, setStudents }) {
    const [newStudentNameInput, setNewStudentInput] = useState("");

    const addNewStudent = () => {
        addStudent(students, newStudentNameInput, "supervisor", setStudents);
        setNewStudentInput("");
    };

    const deleteStudent = (student) => {
        let newStudentsList = [];
        newStudentsList.push(...students);
        console.log(student);
        newStudentsList = newStudentsList.filter((s) => s.name !== student);
        setStudents(newStudentsList);
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
            <div style={{ display: "flex", gap: "20px" }}>
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
                <button
                    type="button"
                    style={{ backgroundColor: "white", color: "black" }}
                    onClick={addNewStudent}
                >
                    Add
                </button>
            </div>
            <ul>
                {students.map((item, i) => (
                    <>
                        {item.role == "supervisor" && (
                            <li
                                key={i}
                                style={{ display: "flex", gap: "10px" }}
                            >
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
                                <button
                                    onClick={() => {
                                        deleteStudent(item.name);
                                    }}
                                >
                                    delete
                                </button>
                                <button
                                    onClick={() => {
                                        editStudent(item.name);
                                    }}
                                >
                                    Edit
                                </button>
                            </li>
                        )}
                    </>
                ))}
            </ul>
        </div>
    );
}

export default Supervisors;
