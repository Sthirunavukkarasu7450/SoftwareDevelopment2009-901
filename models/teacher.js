const { User } = require("./user");

class Teacher extends User {
  constructor(row) {
    super(row);
    this.courses = row.courses;

    if (row.schedule != null) {
      this.schedule = Buffer.from(row.schedule).toString("base64");
    } else {
      this.schedule = null;
    }
  }
}

module.exports = {
  Teacher,
};
