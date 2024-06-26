import downloadData from "./downloadData.jsx";

const BackupData = ({ students }) => {
    return (
        <>
            <h1>Have a backup CSV file of your data containing all students</h1>
            <button
                className="download-btn"
                onClick={() => {
                    downloadData(students);
                }}
            >
                Download data
            </button>
        </>
    );
};

export default BackupData;
