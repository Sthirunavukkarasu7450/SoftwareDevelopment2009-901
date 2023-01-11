// database for school operations, inherits from base class

const { BaseDB } = require("./base");

class SchoolDB extends BaseDB {
  // add a school to the database
  async insertSchool(name, address, phone, principal_id) {
    return await this.execute(`INSERT INTO schools (name, address, phone, principal_id) VALUES ($1, $2, $3, $4)`, [
      name,
      address,
      phone,
      principal_id,
    ]);
  }
}

module.exports = {
  SchoolDB,
};
