const { User } = require("./user");

class Admin extends User {
  constructor(row) {
    super(row);
    this.all_users = row.all_users;
  }
}

module.exports = {
  Admin,
};
