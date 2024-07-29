import deleteStudent from "./deleteStudent";
import Button from "../Button";
import updateStudentRole from "./updateStudentRole";

const AskConfirmation = ({
    students,
    setStudents,
    selectedStudent,
    action,
}) => {
    const handleCancel = () => {
        document.getElementById("confirmation").style.display = "none";
    };
    const handleEvent = () => {
        if (action == "delete")
            deleteStudent(students, setStudents, selectedStudent.index);
        else {
            updateStudentRole(selectedStudent.index, students, setStudents);
        }
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
                            <b>{selectedStudent.name}</b>
                        </div>
                        <div className="confirmation-btns">
                            <Button varient="danger" onClick={handleEvent}>
                                {action}
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
