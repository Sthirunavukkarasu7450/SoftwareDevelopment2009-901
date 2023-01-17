const { User } = require("./user");

class Student extends User {
  constructor(row) {
    super(row);
    this.grade = row.grade;
    this.grade_principal_id = row.grade_principal_id;
    this.counselor_id = row.counselor_id;
    this.homeroom_teacher_id = row.homeroom_teacher_id;
    this.course_ids = row.course_ids;
    this.schedule = Buffer.from(row.schedule).toString('base64');
    this.portfolio = Buffer.from(row.portfolio).toString('base64');
  }
}

module.exports = {
  Student,
};
