function addStudent(
    studentsList,
    setStudents,
    newStudentName,
    newStudentGender
) {
    let newStudentsList = [];
    newStudentsList.push(...studentsList);
    const newStudent = {};
    newStudent.name = newStudentName;
    newStudent.role = "student";
    newStudent.gender = newStudentGender;
    newStudentsList.unshift(newStudent);
    setStudents(newStudentsList);
}

export default addStudent;
