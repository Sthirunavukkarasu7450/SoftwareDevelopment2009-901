// display a student's information in html form

function displayStudent(student) {
  return `
    <p>Name: ${student.first_name} ${student.last_name}</p>
    <p>Grade: ${student.grade}</p>
    <p>Birthday: ${student.birthday}</p>
    <p>Address: ${student.address}</p>
    <p>Email: ${student.email}</p>
    <p>Password: ${student.password}</p>
    <br>
    `;
}
