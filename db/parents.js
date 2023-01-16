// database for parent operations, inherits from base class

const { BaseDB } = require("./base");

class ParentDB extends BaseDB {
  // add a parent to the database, a user must be created first
  async insertParent(parent_id, student_ids) {
    return await this.execute(`INSERT INTO parents (parent_id, student_ids) VALUES ($1, $2)`, [parent_id, student_ids]);
  }

  // get additional parent attributes
  async getParent(parent_id) {
    let results = await this.execute(`SELECT * FROM parents WHERE parent_id = $1`, [parent_id]);
    if (results.rows.length == 0) {
      return null;
    }
    return results.rows[0];
  }
}

module.exports = {
  ParentDB,
};
