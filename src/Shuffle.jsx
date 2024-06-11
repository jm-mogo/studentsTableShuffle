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
        let counter = 0;
        let amountOfStudents = Students.length;
        let studentsPerTable = Math.ceil(amountOfStudents / ammountOfTables);
        shuffle(Students);
        shuffle(Supervisors);
        let newTable = [];
        let newTables = [];
        for (let i = 0; i < amountOfStudents; i++) {
            newTable.push(Students[i]);
            counter++;
            if (counter == studentsPerTable) {
                counter = 0;
                newTables.push(newTable);
                newTable = [];
            }
            if (i == amountOfStudents - 1 && newTable.length > 0) {
                newTables.push(newTable);
            }
        }
        newTable = [];
        let i = 0;
        while (Supervisors.length > 0) {
            newTables[i].push(Supervisors.shift());

            if (i > ammountOfTables) {
                i = 0;
            }
            i++;
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
