const updateStudentRole = (i, students, setStudents) => {
    let index = i;
    console.log(index);
    let newStudentsList = [];
    newStudentsList.push(...students);
    // newStudentsList[index].role = e.target.value;
    newStudentsList[index].role =
        newStudentsList[index].role == "student" ? "supervisor" : "student";
    delete newStudentsList[index].edit;
    setStudents(newStudentsList);
};

export default updateStudentRole;
