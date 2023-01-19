// display a student's course in html form

function displayStudentCourse(student, course) {
  return `
    <h2 class="card-title">${course.course_name}</h2>
    <p>Grade: ${course.student_grades[student.user_id]}%</p>
    <br>
    `;
}
