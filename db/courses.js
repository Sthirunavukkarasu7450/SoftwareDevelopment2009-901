// database for course operations, inherits from base class

const { BaseDB } = require("./base");

class CourseDB extends BaseDB {
  // add course to the database
  async insertCourse(course_name, teacher_id, student_ids, student_grades) {
    return await this.execute(
      `INSERT INTO courses (course_name, teacher_id, student_ids, student_grades) VALUES ($1, $2, $3, $4)`,
      [course_name, teacher_id, student_ids, student_grades]
    );
  }
}

module.exports = {
  CourseDB,
};
