import { useState } from "react";
// import { isCompositeComponent } from "react-dom/test-utils";

function Shuffle({ students }) {
    const Supervisors = students.filter(
        (student) => student.role == "supervisor"
    );
    const Students = students.filter((student) => student.role == "student");

    const [ammountOfTables, setAmmountOfTabls] = useState(0);
    const [tables, setTables] = useState([]);
    console.log(tables);
    const handleChange = (e) => {
        setAmmountOfTabls(e.target.value);
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffleStudents = () => {
        shuffle(Students);
        shuffle(Supervisors);
        let newTables = [];
        for (let i = 0; i < ammountOfTables; i++) {
            newTables.push([]);
        }
        let i = 0;
        while (Students.length > 0) {
            newTables[i].push(Students.shift());

            if (i >= newTables.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        i = 0;
        while (Supervisors.length > 0) {
            newTables[i].push(Supervisors.shift());

            if (i >= newTables.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        setTables(newTables);
    };

    return (
        <>
            <div>
                <label htmlFor="">Ammount of tables</label>
                <input
                    type="number"
                    onChange={handleChange}
                    value={ammountOfTables}
                />
                <button onClick={shuffleStudents}>Shuffle</button>
            </div>

            <ul>
                {tables.map((table, i) => (
                    <ol style={{ margin: "20px" }}>
                        table {i + 1}
                        {table.map((student) => (
                            <>
                                {student.role == "supervisor" ? (
                                    <li>
                                        {student.name}{" "}
                                        <b style={{ color: "red" }}>
                                            Supervisor
                                        </b>
                                    </li>
                                ) : (
                                    <li>{student.name}</li>
                                )}
                            </>
                        ))}
                    </ol>
                ))}
            </ul>
        </>
    );
}

export default Shuffle;
