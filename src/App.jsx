import StudentsList from "./StudentsList.jsx";
// import Supervisors from "./Supervisors.jsx";
import { useState } from "react";
import data from "./data.json";
import Shuffle from "./Shuffle.jsx";

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
