const { User } = require("./user");

class Student extends User {
  constructor(row) {
    super(row);
    this.grade = row.grade;

    this.grade_principal_id = row.grade_principal_id;
    this.grade_principal = row.grade_principal;
    this.counselor_id = row.counselor_id;
    this.counselor = row.counselor;
    this.homeroom_teacher_id = row.homeroom_teacher_id;
    this.homeroom_teacher = row.homeroom_teacher;

    this.course_ids = row.course_ids;
    this.courses = row.courses;

    if (row.schedule != null) {
      this.schedule = Buffer.from(row.schedule).toString("base64");
    } else {
      this.schedule = null;
    }

    if (row.portfolio != null) {
      this.portfolio = Buffer.from(row.portfolio).toString("base64");
    } else {
      this.portfolio = null;
    }
  }
}

module.exports = {
  Student,
};
