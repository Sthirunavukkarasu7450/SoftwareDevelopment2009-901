// generic course
class Course {
  constructor(row) {
    this.course_name = row.course_name;
    this.teacher_id = row.teacher_id;
    this.student_ids = row.student_ids;
    this.student_grades = row.student_grades;
    this.students = [];
  }
}

module.exports = {
  Course,
};
