import StudentsList from "./studentList/StudentsList.jsx";
import { useState, useEffect } from "react";
import {
    getStutudentsListData,
    updataStudentsListData,
} from "./firebase/firebase.js";
import Shuffle from "./shuffleStudents/Shuffle.jsx";
import BackupData from "./backupData/BackupData.jsx";
import ImportData from "./importData/ImportData.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import "./App.css";
import "./studentList/addStudent.css";
import "./shuffleStudents/Shuffle.css";
import "./backupData/BackupData.css";
import "./importData/ImportData.css";
import { useAuth } from "./context/authContext.jsx";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarMenu from "./Components/AvatarMenu/AvatarMenu.jsx";

function App() {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    if (!user) {
        navigate("/login");
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <h1>LOADING...</h1>;
    }

    const [students, setStudents] = useState([]);
    const [tables, setTables] = useState([]);
    const [menuSelection, setMenuSelection] = useState("students");

    useEffect(() => {
        const getData = async () => {
            let data = await getStutudentsListData(user);
            const studentsList = JSON.parse(data.studentsList);
            const studentsTable = data.studentsTable
                ? JSON.parse(data.studentsTable)
                : [];
            setStudents(studentsList);
            setTables(studentsTable);
        };
        getData();
    }, []);

    // useEffect(() => {
    //     const studentsData = JSON.parse(localStorage.getItem("students"));
    //     if (studentsData) {
    //         setStudents(studentsData);
    //     }
    // }, []);

    useEffect(() => {
        if (students.length > 0) {
            updataStudentsListData(user, students, tables);
        }
    }, [students, tables]);

    function displayMain() {
        if (menuSelection == "students") {
            return (
                <StudentsList students={students} setStudents={setStudents} />
            );
        }
        if (menuSelection == "shuffle") {
            return (
                <Shuffle
                    students={students}
                    tables={tables}
                    setTables={setTables}
                />
            );
        }
        if (menuSelection == "backup") {
            return <BackupData students={students} />;
        }
        if (menuSelection == "import") {
            return <ImportData students={students} setStudents={setStudents} />;
        }
    }

    return (
        <>
            <header>
                <Box></Box>
                <h1>School cafeteria manager</h1>

                <AvatarMenu user={user} handleLogout={handleLogout} />
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
                                menuSelection == "import" ? "menu-selected" : ""
                            }
                            onClick={() => {
                                setMenuSelection("import");
                            }}
                        >
                            {" "}
                            <span className="icon import"> </span>Import backup
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
