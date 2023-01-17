// database for teacher operations, inherits from base class

const { BaseDB } = require("./base");

class TeacherDB extends BaseDB {
  // add a teacher to the database, a user must be created first
  async insertTeacher(teacher_id, schedule) {
    return await this.execute(`INSERT INTO teachers (teacher_id, schedule) VALUES ($1, $2, $3)`, [
      teacher_id,
      schedule,
    ]);
  }

  // get additional teacher attributes
  async getTeacher(teacher_id) {
    let results = await this.execute(`SELECT * FROM teachers WHERE teacher_id = $1`, [teacher_id]);
    if (results.rows.length == 0) {
      return null;
    }
    return results.rows[0];
  }
}

module.exports = {
  TeacherDB,
};
