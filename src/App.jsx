import StudentsList from "./studentList/StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState, useEffect } from "react";
// import data from "./data.json";
import Shuffle from "./shuffleStudents/Shuffle.jsx";
import BackupData from "./backupData/BackupData.jsx";
import UploadData from "./uploadData/UploadData.jsx";
import Footer from "./Footer.jsx";
import "./App.css";
import "./studentList/addStudent.css";
import "./shuffleStudents/Shuffle.css";
import "./backupData/BackupData.css";
import "./uploadData/UploadData.css";

function App() {
    const [students, setStudents] = useState([]);
    const [menuSelection, setMenuSelection] = useState("students");
    const get = async function () {
        downloadData(students);
    };

    useEffect(() => {
        const studentsData = JSON.parse(localStorage.getItem("students"));
        if (studentsData) {
            setStudents(studentsData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    function displayMain() {
        if (menuSelection == "students") {
            return (
                <StudentsList students={students} setStudents={setStudents} />
            );
        }
        if (menuSelection == "shuffle") {
            return <Shuffle students={students} />;
        }
        if (menuSelection == "backup") {
            return <BackupData students={students} />;
        }
        if (menuSelection == "upload") {
            return <UploadData students={students} setStudents={setStudents} />;
        }
    }

    return (
        <>
            <header>
                <h1>School cafeteria manager</h1>
            </header>
            <main>
                <aside>
                    <div className="aside-btns">
                        <button
                            className={
                                menuSelection == "students"
                                    ? "menu-selected"
                                    : ""
                            }
                            onClick={() => {
                                setMenuSelection("students");
                            }}
                        >
                            <span className="icon students"> </span>
                            Students List
                        </button>
                        <button
                            className={
                                menuSelection == "shuffle"
                                    ? "menu-selected"
                                    : ""
                            }
                            onClick={() => {
                                setMenuSelection("shuffle");
                            }}
                        >
                            <span className="icon shuffle"> </span>
                            Shuffle students
                        </button>
                        <button
                            className={
                                menuSelection == "backup" ? "menu-selected" : ""
                            }
                            onClick={() => {
                                setMenuSelection("backup");
                            }}
                        >
                            {" "}
                            <span className="icon backup"> </span> Backup data
                        </button>
                        <button
                            className={
                                menuSelection == "upload" ? "menu-selected" : ""
                            }
                            onClick={() => {
                                setMenuSelection("upload");
                            }}
                        >
                            {" "}
                            <span className="icon upload"> </span>Upload backup
                        </button>
                    </div>

                    <Footer />
                </aside>
                <section>{displayMain()}</section>
            </main>
        </>
    );
}

export default App;
