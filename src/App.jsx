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

    const csvmaker = function (data) {
        // Empty array for storing the values
        const csvRows = [];

        // Headers is basically a keys of an object which
        // is id, name, and profession
        const headers = Object.keys(data[0]);

        // As for making csv format, headers must be
        // separated by comma and pushing it into array
        csvRows.push(headers.join(","));

        // Pushing Object values into the array with
        // comma separation

        // Looping through the data values and make
        // sure to align values with respect to headers
        for (const row of data) {
            const values = headers.map((e) => {
                return row[e];
            });
            csvRows.push(values.join(","));
        }
        // const values = Object.values(data).join(',');
        // csvRows.push(values)

        // returning the array joining with new line
        download(csvRows.join("\n"));
    };

    const download = (data) => {
        // Create a Blob with the CSV data and type
        const blob = new Blob([data], { type: "text/csv" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor tag for downloading
        const a = document.createElement("a");

        // Set the URL and download attribute of the anchor tag
        a.href = url;
        a.download = "download.csv";

        // Trigger the download by clicking the anchor tag
        a.click();
    };

    const get = async function () {
        // JavaScript object

        console.log(csvmaker(students));
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
