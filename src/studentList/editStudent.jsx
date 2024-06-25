const editStudent = (i, students, setStudents) => {
    let newStudentsList = [];
    newStudentsList.push(...students);
    // newStudentsList.map((student) => {
    //     if (student.name == studentName) {
    //         student.edit ? delete student["edit"] : (student.edit = true);
    //     }
    // });
    
    newStudentsList[i].edit ? delete newStudentsList[i]["edit"] : (newStudentsList[i].edit = true);

    setStudents(newStudentsList);
};

export default editStudent;
