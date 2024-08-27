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
        fontSize: 12,
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
        fontSize: 14,
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

const PDFgenerator = ({ tables }) => (
    <Document title="Lista de estudiantes">
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
                        <Text style={styles.textH}>Mesa {index + 1}</Text>
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
                        <Text style={styles.textH}>Mesa {index + 1}</Text>
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
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Font,
} from "@react-pdf/renderer";

export default PDFgenerator;
