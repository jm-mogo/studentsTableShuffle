import deleteStudent from "./deleteStudent";
import Button from "../Button";

const AskConfirmation = ({
    students,
    setStudents,
    selectedStudent,
    action,
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
                            <Button varient="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button varient="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AskConfirmation;
