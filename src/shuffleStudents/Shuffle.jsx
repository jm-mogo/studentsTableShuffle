import { useState } from "react";
// import { isCompositeComponent } from "react-dom/test-utils";

function Shuffle({ students }) {
    const Supervisors = students.filter(
        (student) => student.role == "supervisor"
    );
    const Students = students.filter((student) => student.role == "student");
    const MaleStudents = Students.filter((student) => student.gender == "M");
    const FemaleStudents = Students.filter((student) => student.gender == "F");

    const [ammountOfTables, setAmmountOfTabls] = useState();
    const [tables, setTables] = useState([]);
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

    const sortTablesByGender = (tables) => {
        tables.forEach((table) => {
            table.sort(function (a, b) {
                if (a.role == "supervisor") {
                    return -1;
                }
                if (b.role == "supervisor") {
                    return 1;
                }
                if (a.gender > b.gender) {
                    return -1;
                }
                if (b.gender < a.gender) {
                    return 0;
                }

                return 0;
            });
        });
    };

    const shuffleStudents = () => {
        shuffle(MaleStudents);
        shuffle(FemaleStudents);
        shuffle(Supervisors);
        let newTables = [];
        for (let i = 0; i < ammountOfTables; i++) {
            newTables.push([]);
        }
        let i = 0;
        while (MaleStudents.length > 0) {
            newTables[i].push(MaleStudents.shift());

            if (i >= newTables.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        while (FemaleStudents.length > 0) {
            newTables[i].push(FemaleStudents.shift());

            if (i >= newTables.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        while (Supervisors.length > 0) {
            newTables[i].push(Supervisors.shift());

            if (i >= newTables.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }
        sortTablesByGender(newTables);
        setTables(newTables);
    };

    const moveStudent = (e, studentTable, studentIndex) => {
        // console.log(e.target.value, studentTable, studentIndex);
        let newTables = [...tables];
        let tableToMove = e.target.value;
        let newStudent = newTables[studentTable].splice(studentIndex, 1);
        console.log(newStudent[0].role);
        if (newStudent[0].role == "supervisor") {
            let newSupervisor;
            newTables[tableToMove - 1].forEach((student, i) => {
                if (student.role == "supervisor") {
                    newSupervisor = newTables[tableToMove - 1].splice(i, 1);
                    newTables[studentTable].unshift(...newSupervisor);
                }
            });
        }
        newTables[tableToMove - 1].unshift(...newStudent);
        e.target.value = studentTable + 1;
        sortTablesByGender(newTables);
        setTables(newTables);
    };

    return (
        <>
            <h1>There are {Supervisors.length} supervisors</h1>
            <div className="input-tables-section">
                <label htmlFor="">Ammount of tables</label>
                <input
                    type="number"
                    onChange={handleChange}
                    value={ammountOfTables}
                />
                <button onClick={shuffleStudents}>Shuffle</button>
            </div>

            <div className="tables-section">
                {tables.map((table, i) => (
                    <div>
                        <h1>table {i + 1}</h1>
                        <ol className="table">
                            {table.map((student, studentIndex) => (
                                <>
                                    {student.role == "supervisor" ? (
                                        <li className="tableData">
                                            <b>
                                                {studentIndex +
                                                    1 +
                                                    ". " +
                                                    student.name}{" "}
                                            </b>
                                            <div>
                                                <select
                                                    name="table"
                                                    id="table"
                                                    onChange={(e) => {
                                                        moveStudent(
                                                            e,
                                                            i,
                                                            studentIndex
                                                        );
                                                    }}
                                                >
                                                    {tables.map(
                                                        (value, index) => (
                                                            <option
                                                                selected={
                                                                    i ==
                                                                        index &&
                                                                    true
                                                                }
                                                            >
                                                                {index + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <span
                                                    className={
                                                        student.gender == "M"
                                                            ? "boy"
                                                            : "girl"
                                                    }
                                                >
                                                    {" " + "O"}
                                                </span>
                                            </div>
                                        </li>
                                    ) : (
                                        <li className="tableData">
                                            <p>
                                                {studentIndex +
                                                    1 +
                                                    ". " +
                                                    student.name}
                                            </p>
                                            <div>
                                                <select
                                                    name="table"
                                                    id="table"
                                                    onChange={(e) => {
                                                        moveStudent(
                                                            e,
                                                            i,
                                                            studentIndex
                                                        );
                                                    }}
                                                >
                                                    {tables.map(
                                                        (value, index) => (
                                                            <option
                                                                selected={
                                                                    i ==
                                                                        index &&
                                                                    true
                                                                }
                                                            >
                                                                {index + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <span
                                                    className={
                                                        student.gender == "M"
                                                            ? "boy"
                                                            : "girl"
                                                    }
                                                >
                                                    {" " + "O"}
                                                </span>
                                            </div>
                                        </li>
                                    )}
                                </>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Shuffle;
