function deleteStudent(students, setStudents, studentIndex) {
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList.splice(studentIndex, 1);
    setStudents(newStudentsList);
}

export default deleteStudent;
