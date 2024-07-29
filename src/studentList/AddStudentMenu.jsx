import Button from "../Button";

function AddStudentMenu({
    addNewStudent,
    newStudentNameInput,
    setNewStudentInput,
    studentRole,
}) {
    function closeNav() {
        document.getElementById("myNav").style.height = "0";
        document.querySelector('input[name="gender"]:checked').checked = false;
        setNewStudentInput("");
    }
    function checkRadioInput() {
        if (document.querySelector('input[name="gender"]:checked').id) {
            return true;
        }
    }

    function addStudent() {
        if (!checkRadioInput()) return;

        addNewStudent(
            document.querySelector('input[name="gender"]:checked').id
        );
        closeNav();
    }

    return (
        <div className="overlay" id="myNav">
            <div className="overlay-content">
                <form action="none">
                    <h2 className="titleNewStudent">New {studentRole}</h2>
                    <div className="input-new-student">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={newStudentNameInput}
                            onChange={(e) => {
                                setNewStudentInput(e.target.value);
                            }}
                        />
                    </div>
                    <div className="input-radio">
                        <legend>Gender:</legend>
                        <div>
                            <label htmlFor="M">
                                Male <input type="radio" id="M" name="gender" />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="F">
                                Female{" "}
                                <input type="radio" id="F" name="gender" />
                            </label>
                        </div>
                    </div>
                    <div className="buttons-newStudent">
                        <Button varient="primary" onClick={addStudent}>
                            Add
                        </Button>
                        <Button varient="secondary" onClick={closeNav}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStudentMenu;
