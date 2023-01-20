// generic user class
class User {
  constructor(row) {
    this.user_id = row.user_id;
    this.account_type = row.account_type;
    this.last_name = row.last_name;
    this.first_name = row.first_name;
    this.birthday = row.birthday.toISOString().split("T")[0]; // convert to yyyy-mm-dd
    this.address = row.address;
    this.email = row.email;
    this.password = row.password;

    // avatar is a jpg image
    if (row.avatar != null) {
      this.avatar = Buffer.from(row.avatar).toString("base64");
    } else {
      this.avatar = null;
    }
  }
}

module.exports = {
  User,
};
