const editStudent = (studentName, students, setStudents) => {
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList.map((student) => {
        if (student.name == studentName) {
            student.edit ? delete student["edit"] : (student.edit = true);
        }
    });
    setStudents(newStudentsList);
};

export default editStudent;
