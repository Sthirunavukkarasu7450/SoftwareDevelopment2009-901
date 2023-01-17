const { User } = require("./user");

class Teacher extends User {
  constructor(row) {
    super(row);
    this.course_ids = row.course_ids;
    this.schedule = Buffer.from(row.schedule).toString('base64');
  }
}

module.exports = {
  Teacher,
};
