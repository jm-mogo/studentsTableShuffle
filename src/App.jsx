import StudentsList from "./studentList/StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";
import Shuffle from "./Shuffle.jsx";
import downloadData from "./downloadData.jsx";
import "./addStudent.css";

function ButtonMenuSelection({ menuName, setMenuSelection }) {
    return (
        <button
            onClick={() => {
                setMenuSelection(menuName);
            }}
        >
            {menuName}
        </button>
    );
}

function App() {
    const [menuSelection, setMenuSelection] = useState("student");
    const [students, setStudents] = useState(data);

    const get = async function () {
        downloadData(students);
    };

    return (
        <>
            <ButtonMenuSelection
                menuName={"student"}
                setMenuSelection={setMenuSelection}
            />
            <ButtonMenuSelection
                menuName={"supervisor"}
                setMenuSelection={setMenuSelection}
            />
            <ButtonMenuSelection
                menuName={"shuffle"}
                setMenuSelection={setMenuSelection}
            />
            <button onClick={get}>Download data</button>
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
