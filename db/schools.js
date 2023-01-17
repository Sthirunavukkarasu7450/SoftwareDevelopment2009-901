// database for school operations, inherits from base class

const { BaseDB } = require("./base");
const { School } = require("../models/school");

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

  // get a school from the database
  async getSchool(name) {
    let results = await this.execute(`SELECT * FROM schools WHERE name = $1`, [name]);
    if (results.rows.length == 0) {
      return null;
    }
    return new School(results.rows[0]);
  }
}

module.exports = {
  SchoolDB,
};
