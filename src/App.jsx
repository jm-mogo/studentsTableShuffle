import Students from "./Students.jsx";
import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";

function App() {
    const [menuSelection, setMenuSelection] = useState("students");
    const [students, setStudents] = useState(data);

    if (menuSelection == "students") {
        return (
            <>
                <button
                    onClick={() => {
                        setMenuSelection("students");
                    }}
                >
                    Students
                </button>
                <button
                    onClick={() => {
                        setMenuSelection("supervisors");
                    }}
                >
                    Supervisors
                </button>
                <Students students={students} setStudents={setStudents} />
            </>
        );
    } else {
        return (
            <>
                <button
                    onClick={() => {
                        setMenuSelection("students");
                    }}
                >
                    Students
                </button>
                <button
                    onClick={() => {
                        setMenuSelection("supervisors");
                    }}
                >
                    Supervisors
                </button>
                <Supervisors students={students} setStudents={setStudents} />
            </>
        );
    }
}

export default App;
