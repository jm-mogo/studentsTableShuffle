import downloadData from "./downloadData.jsx";

const BackupData = ({ students }) => {
    return (
        <>
            <h2 className="backup-title">
                Have a backup CSV file of your data containing all students
            </h2>
            <div className="file-view">
                <span className="csv"></span>
                <p>backup-students.csv</p>
            </div>
            <button
                className="download-btn"
                onClick={() => {
                    downloadData(students);
                }}
            >
                DOWNLOAD FILE
            </button>
        </>
    );
};

export default BackupData;
