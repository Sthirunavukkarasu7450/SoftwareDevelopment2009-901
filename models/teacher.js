const { User } = require("./user");

class Teacher extends User {
  constructor(row) {
    super(row);
    this.course_ids = row.course_ids;
    this.schedule = row.schedule;
  }
}

module.exports = {
  Teacher,
};
