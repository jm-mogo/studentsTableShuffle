function addStudent(studentsList, newStudentName, newStudentRole, setStudents) {
    let newStudentsList = [];
    newStudentsList.push(...studentsList);
    const newStudent = {};
    newStudent.name = newStudentName;
    newStudent.role = newStudentRole;
    newStudentsList.unshift(newStudent);
    setStudents(newStudentsList);
}

export default addStudent;
