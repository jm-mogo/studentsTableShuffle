const editStudent = (studentName, students, setStudents) => {
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList.map((student) => {
        if (student.name == studentName) {
            student.edit ? (student.edit = false) : (student.edit = true);
        }
    });
    setStudents(newStudentsList);
};

export default editStudent;
