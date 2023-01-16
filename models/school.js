// generic school
class School {
  constructor(row) {
    this.name = row.name;
    this.address = row.address;
    this.phone = row.phone;
    this.principal_id = row.principal_id;
  }
}

module.exports = {
  School,
};
