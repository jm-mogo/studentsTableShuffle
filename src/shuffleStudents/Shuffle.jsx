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
        setTables(newTables);
    };

    const moveStudent = (e, studentTable, studentIndex) => {
        console.log(e.target.value, studentTable, studentIndex);
        let newTables = [...tables];
        let tableToMove = e.target.value;
        let newStudent = newTables[studentTable].splice(studentIndex, 1);
        newTables[tableToMove - 1].unshift(...newStudent);
        e.target.value = studentTable + 1;
        setTables(newTables);
    };

    return (
        <>
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
                                        <li>
                                            {studentIndex +
                                                1 +
                                                ". " +
                                                student.name}{" "}
                                            <b
                                                style={{
                                                    color: "rgb(35 129 222)",
                                                }}
                                            >
                                                Supervisor
                                            </b>
                                        </li>
                                    ) : (
                                        <li
                                            style={
                                                student.gender == "M"
                                                    ? {
                                                          color: "blue",
                                                          display: "flex",
                                                          width: "100%",
                                                          justifyContent:
                                                              "space-between",
                                                      }
                                                    : {
                                                          color: "DeepPink",
                                                          display: "flex",
                                                          width: "100%",
                                                          justifyContent:
                                                              "space-between",
                                                      }
                                            }
                                        >
                                            {" "}
                                            {studentIndex +
                                                1 +
                                                ". " +
                                                student.name}
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
                                                {tables.map((value, index) => (
                                                    <option
                                                        selected={
                                                            i == index && true
                                                        }
                                                    >
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <button
                                            onClick={(e) => {
                                                moveStudent(i, j);
                                            }}
                                        >
                                            move
                                        </button> */}
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
