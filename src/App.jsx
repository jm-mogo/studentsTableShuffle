import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
    const [newStudentNameInput, setNewStudentInput] = useState("");
    const [students, setStudents] = useState(data);

    const addStudent = () => {
        const newStudentsList = [];
        newStudentsList.push(...students);
        const newStudent = {};
        newStudent.name = newStudentNameInput;
        newStudentsList.unshift(newStudent);
        console.log(newStudentsList);
        setStudents(newStudentsList);
        setNewStudentInput("");
    };

    const deleteStudent = (student) => {
        let newStudentsList = [];
        newStudentsList.push(...students);
        console.log(student);
        newStudentsList = newStudentsList.filter((s) => s.name !== student);
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
                    onClick={addStudent}
                >
                    Add
                </button>
            </div>
            <ul>
                {students.map((item) => (
                    <>
                        <li
                            key={item.id}
                            style={{ display: "flex", gap: "10px" }}
                        >
                            {item.name}
                            <button
                                onClick={() => {
                                    deleteStudent(item.name);
                                }}
                            >
                                delete
                            </button>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default App;
