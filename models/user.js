// generic user class
class User {
  constructor(row) {
    this.account_type = row.account_type;
    this.last_name = row.last_name;
    this.first_name = row.first_name;
    this.birthday = row.birthday;
    this.address = row.address;
    this.email = row.email;
    this.password = row.password;
  }
}

module.exports = {
  User,
};
