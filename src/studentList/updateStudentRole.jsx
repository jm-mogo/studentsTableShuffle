const updateStudentRole = (e, i, students, setStudents) => {
    let index = i;
    console.log(index)
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList[index].role = e.target.value;
    delete newStudentsList[index].edit 
    setStudents(newStudentsList);

}

export default updateStudentRole