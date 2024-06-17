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
                        <legend>Gender</legend>
                        <div>
                            <input type="radio" id="M" name="gender" />
                            <label htmlFor="M">Male</label>
                        </div>
                        <div>
                            <input type="radio" id="F" name="gender" />
                            <label htmlFor="F">Female</label>
                        </div>
                    </div>
                    <div className="buttons-newStudent">
                        <button
                            className="closebtn"
                            id="closebtn"
                            type="button"
                            onClick={closeNav}
                        >
                            Cancel
                        </button>
                        <button
                            className="add-student-button"
                            id="add-student-button"
                            type="button"
                            onClick={() => {
                                if (!checkRadioInput()) return;

                                addNewStudent(
                                    document.querySelector(
                                        'input[name="gender"]:checked'
                                    ).id
                                );
                                closeNav();
                            }}
                        >
                            Add student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStudentMenu;
