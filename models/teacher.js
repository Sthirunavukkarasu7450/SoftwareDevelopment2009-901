const { User } = require("./user");

class Teacher extends User {
  constructor(row) {
    super(row);
    this.courses = row.courses;
    this.schedule = Buffer.from(row.schedule).toString('base64');
  }
}

module.exports = {
  Teacher,
};
