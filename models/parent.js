const { User } = require("./user");

class Parent extends User {
  constructor(row) {
    super(row);
    this.children_ids = row.children_ids;
  }
}

module.exports = {
  Parent,
};
