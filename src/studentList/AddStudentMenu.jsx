function AddStudentMenu({
    addNewStudent,
    newStudentNameInput,
    setNewStudentInput,
    studentRole,
}) {
    return (
        <div className="overlay" id="myNav">
            <div className="overlay-content">
                <form>
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
                    <div class="buttons-newStudent">
                        <button
                            class="closebtn"
                            id="closebtn"
                            type="button"
                            onClick={() => {
                                document.getElementById("myNav").style.height =
                                    "0";
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="add-student-button"
                            id="add-student-button"
                            type="button"
                            onClick={() => {
                                document.getElementById("myNav").style.height =
                                    "0";
                                addNewStudent(
                                    document.querySelector(
                                        'input[name="gender"]:checked'
                                    ).id
                                );
                            }}
                        >
                            Add task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStudentMenu;
