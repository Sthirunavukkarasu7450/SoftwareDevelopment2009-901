// database for student operations, inherits from base class

const { BaseDB } = require("./base");

class StudentDB extends BaseDB {
  // add a student to the database, a user must be created first
  async insertStudent(
    student_id,
    grade,
    grade_principal_id,
    counselor_id,
    homeroom_teacher_id,
    course_ids,
    schedule,
    portfolio
  ) {
    return await this.execute(
      `INSERT INTO students (student_id, grade, grade_principal_id, counselor_id, homeroom_teacher_id, course_ids, schedule, portfolio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [student_id, grade, grade_principal_id, counselor_id, homeroom_teacher_id, course_ids, schedule, portfolio]
    );
  }

  // get additional student attributes
  async getStudent(student_id) {
    let results = await this.execute(`SELECT * FROM students WHERE student_id = $1`, [student_id]);
    if (results.rows.length == 0) {
      return null;
    }
    return results.rows[0];
  }
}

module.exports = {
  StudentDB,
};
