function deleteStudent(students, setStudents, studentName) {
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList = newStudentsList.filter((s) => s.name !== studentName);
    setStudents(newStudentsList);
}

export default deleteStudent;
