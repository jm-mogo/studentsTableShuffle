function addStudent(
    studentsList,
    setStudents,
    newStudentName,
    newStudentRole,
    newStudentGender
) {
    let newStudentsList = [];
    newStudentsList.push(...studentsList);
    const newStudent = {};
    newStudent.name = newStudentName;
    newStudent.role = newStudentRole;
    newStudent.gender = newStudentGender;
    newStudentsList.unshift(newStudent);
    setStudents(newStudentsList);
}

export default addStudent;
