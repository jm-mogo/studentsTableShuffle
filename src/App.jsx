import StudentsList from "./StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";
import Shuffle from "./Shuffle.jsx";

function App() {
    const [menuSelection, setMenuSelection] = useState("student");
    const [students, setStudents] = useState(data);

    return (
        <>
            <button
                onClick={() => {
                    setMenuSelection("student");
                }}
            >
                Students
            </button>
            <button
                onClick={() => {
                    setMenuSelection("supervisor");
                }}
            >
                Supervisors
            </button>
            <button
                onClick={() => {
                    setMenuSelection("shuffle");
                }}
            >
                Shuffle
            </button>
            {menuSelection !== "shuffle" ? (
                <StudentsList
                    students={students}
                    setStudents={setStudents}
                    studentRole={menuSelection}
                />
            ) : (
                <Shuffle students={students} />
            )}
        </>
    );
}

export default App;
