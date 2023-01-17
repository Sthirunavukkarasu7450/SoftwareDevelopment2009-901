// database for course operations, inherits from base class

const { BaseDB } = require("./base");
const { Course } = require("../models/course");

class CourseDB extends BaseDB {
  // add course to the database
  async insertCourse(course_name, teacher_id, student_ids, student_grades) {
    return await this.execute(
      `INSERT INTO courses (course_name, teacher_id, student_ids, student_grades) VALUES ($1, $2, $3, $4)`,
      [course_name, teacher_id, student_ids, student_grades]
    );
  }

  // get course from the database
  async getCourse(course_id) {
    let results = await this.execute(`SELECT * FROM courses WHERE course_id = $1`, [course_id]);
    if (results.rows.length == 0) {
      return null;
    }
    return new Course(results.rows[0]);
  }
}

module.exports = {
  CourseDB,
};
