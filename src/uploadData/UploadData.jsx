import { useState } from "react";

const UploadData = ({ students, setStudents }) => {
    const [fileName, setFileName] = useState("");
    function onChange() {
        if (document.querySelector("#csvInput").files.length > 0) {
            setFileName(document.querySelector("#csvInput").files[0].name);
        } else {
            setFileName("");
        }
    }
    function csvToArr(stringVal, splitter) {
        const [keys, ...rest] = stringVal
            .trim()
            .split("\n")
            .map((item) => item.split(splitter));

        const formedArr = rest.map((item) => {
            const object = {};
            keys.forEach((key, index) => (object[key] = item.at(index)));
            return object;
        });
        return formedArr;
    }

    const convertData = (e) => {
        const file = document.querySelector("#csvInput").files[0];
        console.log(file.name);
        const reader = new FileReader();
        reader.onload = function (e) {
            // Access to content with e.target.result
            const csvArray = csvToArr(e.target.result, ",");
            console.log(csvArray);
            setStudents(csvArray);
        };

        reader.readAsText(file);

        console.log(file);
    };

    return (
        <>
            <h1>
                Upload a previously downloaded CSV file to restore your students
            </h1>
            <form id="csvForm">
                <input
                    type="file"
                    id="csvInput"
                    accept=".csv"
                    onChange={onChange}
                />
                <label htmlFor="csvInput">
                    {fileName.length > 0 ? fileName : "Choose file..."}
                </label>
                <button
                    type="button"
                    onClick={(e) => {
                        convertData(e);
                    }}
                >
                    <span className="icon upload"></span>
                    Upload
                </button>
            </form>
        </>
    );
};

export default UploadData;
