import { useState } from "react";

const UploadData = ({ students, setStudents }) => {
    const [uploadStatus, setUpload] = useState(false);
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

        keys.forEach((key, i) => {
            keys[i] = key.trim();
            console.log(key);
        });

        const formedArr = rest.map((item) => {
            const object = {};
            keys.forEach((key, index) => (object[key] = item.at(index)));
            return object;
        });
        return formedArr;
    }

    const convertData = (e) => {
        let allowedExtensions = /(\.csv)$/i;
        const file = document.querySelector("#csvInput").files[0];
        if (!file) {
            alert("upload a file");
            return;
        }
        if (!allowedExtensions.exec(file.name)) {
            alert("not valid file \nPlease upload a .csv file");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            // Access to content with e.target.result
            const csvArray = csvToArr(e.target.result, ",");
            csvArray.forEach((student) => {
                student.gender = student.gender[0];
            });
            setStudents(csvArray);
        };

        reader.readAsText(file);
        setUpload(true);
    };

    if (uploadStatus) {
        return <h1>Uploaded succesfully</h1>;
    }

    return (
        <>
            <h2 className="backup-title">
                Upload a previously downloaded CSV file to restore your students
            </h2>

            <form id="csvForm">
                <input
                    type="file"
                    id="csvInput"
                    accept=".csv"
                    onChange={onChange}
                />
                <label htmlFor="csvInput">
                    <span className="icon upload"></span>
                    {fileName.length > 0 ? fileName : "No file chosen, yet!"}
                </label>
                <button
                    type="button"
                    onClick={(e) => {
                        convertData(e);
                    }}
                >
                    UPLOAD FILE
                </button>
            </form>
        </>
    );
};

export default UploadData;
