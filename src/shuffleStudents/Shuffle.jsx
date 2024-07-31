import { useState } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Font,
} from "@react-pdf/renderer";
// import { isCompositeComponent } from "react-dom/test-utils";

Font.register({
    family: "Open Sans",
    fonts: [
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
            fontWeight: 600,
        },
    ],
});
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 40,
        fontFamily: "Open Sans",
        // alignItems: "center",
    },
    title: {
        fontSize: 32,
        marginBottom: 10,
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: 10,
    },
    table: {
        width: "22%",
    },
    textH: {
        fontSize: 22,
    },
    textB: {
        fontSize: 14,
    },
    textS: {
        fontWeight: "bold",
        fontSize: 14,
    },
    allTables: {
        flexDirection: "row",
        flexWrap: "wrap",

        // height: "100%",
    },
    tableContainer: {
        width: "50%",
        alignItems: "center",
        height: 500,
    },
    titleTable: {
        marginBottom: 24,
    },
    headerTable: {
        flexDirection: "row",
        gap: "20",
        marginBottom: 10,
    },
    tableContent: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        width: "90%",
        borderBottom: 0,
        // height: "90%",
    },
    columnTable: {
        width: "100%",
    },
    rowTable: {
        flexDirection: "row",
        width: "100%",
        height: 30,
        textAlign: "left",
        // alignContent: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderBottom: 1,
    },
    column1: {
        marginLeft: 4,
        justifyContent: "center",
        width: "5%",
        height: "100%",
        borderColor: "black",
        borderStyle: "solid",
        borderRight: 1,
        fontWeight: "bold",
    },
    column1Number: {
        marginLeft: 4,
        justifyContent: "center",
        width: "5%",
        height: "100%",
        borderColor: "black",
        borderStyle: "solid",
        borderRight: 1,
        fontSize: 12,
    },
    column2: {
        marginLeft: 4,
        justifyContent: "center",
        width: "50%",
        height: "100%",
        borderColor: "black",
        fontWeight: "bold",
        borderStyle: "solid",
        borderRight: 1,
    },
    column2Student: {
        marginLeft: 4,
        justifyContent: "center",
        width: "50%",
        height: "100%",
        borderColor: "black",
        fontSize: 12,
        borderStyle: "solid",
        borderRight: 1,
    },
    column3: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
        height: "100%",
        fontSize: 10,
        fontWeight: "bold",
        borderColor: "black",
        borderStyle: "solid",
        borderRight: 1,
    },
    column4: {
        alignItems: "center",
        justifyContent: "center",
        width: "15%",
        height: "100%",
        fontSize: 10,
        fontWeight: "bold",
        borderColor: "black",
        borderStyle: "solid",
        borderRight: 1,
    },
    column5: {
        alignItems: "center",
        justifyContent: "center",
        width: "15%",
        height: "100%",
        fontSize: 10,
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
        fontSize: 12,
        // color: "blue",
    },
});

const MyDocument = ({ tables }) => (
    <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
            <View style={styles.allTables}>
                {tables.map((table, index) => (
                    <View style={styles.tableContainer} wrap={false}>
                        <Text style={styles.titleTable}>
                            LISTA DE ASISTENCIA COMEDOR
                        </Text>
                        <View style={styles.headerTable}>
                            <Text>Mesa {index + 1}</Text>
                            <Text>Día________</Text>
                            <Text>Fecha___/___/___/</Text>
                        </View>
                        <View style={styles.tableContent}>
                            <View style={styles.columnTable}>
                                <View style={styles.rowTable}>
                                    <View style={styles.column1}>
                                        <Text>N</Text>
                                    </View>
                                    <View style={styles.column2}>
                                        <Text>Nombre</Text>
                                    </View>
                                    <View style={styles.column3}>
                                        <Text>Desayuno</Text>
                                    </View>
                                    <View style={styles.column4}>
                                        <Text>Comida</Text>
                                    </View>
                                    <View style={styles.column5}>
                                        <Text>Cena</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.columnTable}>
                                {table.map((student, index) => (
                                    <View style={styles.rowTable}>
                                        <View style={styles.column1Number}>
                                            <Text>{index + 1}</Text>
                                        </View>
                                        <View style={styles.column2Student}>
                                            {student.role == "supervisor" ? (
                                                <Text style={styles.bold}>
                                                    {student.name}
                                                </Text>
                                            ) : (
                                                <Text>{student.name}</Text>
                                            )}
                                        </View>
                                        <View style={styles.column3}></View>
                                        <View style={styles.column4}></View>
                                        <View style={styles.column5}></View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <Text break style={styles.title}>
                Hombres
            </Text>
            <View style={styles.list}>
                {tables.map((table, index) => (
                    <View style={styles.table} wrap={false}>
                        <Text style={styles.textH}>Table {index + 1}</Text>
                        {table.map((student) => {
                            if (student.gender === "M") {
                                return student.role == "supervisor" ? (
                                    <p style={styles.textS}>
                                        <Text>{student.name}</Text>
                                    </p>
                                ) : (
                                    <Text style={styles.textB}>
                                        {student.name}
                                    </Text>
                                );
                            }
                        })}
                    </View>
                ))}
            </View>

            <Text style={styles.title} break>
                Mujeres
            </Text>
            <View style={styles.list}>
                {tables.map((table, index) => (
                    <View style={styles.table} wrap={false}>
                        <Text style={styles.textH}>table {index + 1}</Text>
                        {table.map((student) => {
                            if (student.gender === "F") {
                                return student.role == "supervisor" ? (
                                    <p style={styles.textS}>
                                        <Text>{student.name}</Text>
                                    </p>
                                ) : (
                                    <Text style={styles.textB}>
                                        {student.name}
                                    </Text>
                                );
                            }
                        })}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

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
            <PDFViewer>
                <MyDocument tables={tables} />
            </PDFViewer>
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
