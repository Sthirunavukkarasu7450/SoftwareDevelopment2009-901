// database for teacher operations, inherits from base class

const { BaseDB } = require("./base");

class TeacherDB extends BaseDB {
  // add a teacher to the database, a user must be created first
  async insertTeacher(teacher_id, course_ids, schedule) {
    return await this.execute(`INSERT INTO teachers (teacher_id, course_ids, schedule) VALUES ($1, $2, $3)`, [
      teacher_id,
      course_ids,
      schedule,
    ]);
  }
}

module.exports = {
  TeacherDB,
};
