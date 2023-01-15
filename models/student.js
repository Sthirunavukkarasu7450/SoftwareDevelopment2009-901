const { User } = require("./user");

class Student extends User {
  constructor(row) {
    super(row);
    this.grade = row.grade;
    this.teacher = row.teacher;
  }
}

module.exports = {
  Student,
};
