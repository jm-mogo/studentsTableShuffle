const updateName = (e, students, setStudents) => {
    let index = e.target.id;
    let newStudentsList = [];
    newStudentsList.push(...students);
    newStudentsList[index].name = e.target.value;
    setStudents(newStudentsList);
};

export default updateName;
