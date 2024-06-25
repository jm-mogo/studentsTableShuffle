import StudentsList from "./studentList/StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";
import Shuffle from "./shuffleStudents/Shuffle.jsx";
import downloadData from "./downloadData.jsx";
import "./App.css";
import "./addStudent.css";

function App() {
    const [students, setStudents] = useState(data);
    const [menuSelection, setMenuSelection] = useState("students");
    const get = async function () {
        downloadData(students);
    };

    function displayMain() {
        if (menuSelection == "students") {
            return (
                <StudentsList students={students} setStudents={setStudents} />
            );
        }
        return <Shuffle students={students} />;
    }

    return (
        <>
            <header>
                <h1>School cafeteria manager</h1>
            </header>
            <main>
                <aside>
                    <button
                        onClick={() => {
                            setMenuSelection("students");
                        }}
                    >
                        Students List
                    </button>
                    <button
                        onClick={() => {
                            setMenuSelection("shuffle");
                        }}
                    >
                        Shuffle students
                    </button>
                    <button>Backup data</button>
                    <button>Upload backup</button>
                </aside>
                <section>{displayMain()}</section>
            </main>
        </>
    );
}

export default App;
