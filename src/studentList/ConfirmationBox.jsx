import deleteStudent from "./deleteStudent";

const AskConfirmation = ({
    students,
    setStudents,
    selectedStudent = "Mike Morales",
    action = "delete",
}) => {
    const handleCancel = () => {
        document.getElementById("confirmation").style.display = "none";
        console.log("hi");
    };
    const handleDelete = () => {
        deleteStudent(students, setStudents, selectedStudent);
        document.getElementById("confirmation").style.display = "none";
    };
    return (
        <>
            <div className="overlay-box" id="confirmation">
                <div className="content-box">
                    <div className="confirmation-box">
                        <div className="question">Are you sure?</div>
                        <div className="action-description">
                            You are going to <span>{action}</span>{" "}
                            <b>{selectedStudent}</b>
                        </div>
                        <div className="confirmation-btns">
                            <button
                                className="delete-btn"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AskConfirmation;
