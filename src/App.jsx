import StudentsList from "./studentList/StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";
import Shuffle from "./shuffleStudents/Shuffle.jsx";
import downloadData from "./downloadData.jsx";
import "./App.css";
import "./studentList/addStudent.css";
import "./shuffleStudents/Shuffle.css"

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
                    <button className={menuSelection == "students" && "menu-selected"}
                        onClick={() => {
                            setMenuSelection("students");
                        }}
                    >   
                        <span className="icon students"> </span>
                        Students List
                    </button>
                    <button className={menuSelection !== "students" && "menu-selected"}
                        onClick={() => {
                            setMenuSelection("shuffle");
                        }}
                    >
                        <span className="icon shuffle"> </span>
                        Shuffle students
                    </button>
                    <button> <span className="icon backup"> </span> Backup data</button>
                    <button> <span className="icon upload"> </span>Upload backup</button>
                </aside>
                <section>{displayMain()}</section>
            </main>
        </>
    );
}

export default App;
