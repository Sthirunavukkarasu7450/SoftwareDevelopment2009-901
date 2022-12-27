// custom database api

const config = require("../config.json");
const { Client } = require("pg");

class ClassyDB {
  // connect to the database
  constructor() {
    this.client = new Client({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
    });

    this.client.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  // execute a query
  async execute(query, params) {
    return await this.client.query(query, params);
  }

  // add a generic user to the database
  async insertUser(account_type, last_name, first_name, birthday, address, email, password) {
    return await this.execute(
      `INSERT INTO users (account_type, last_name, first_name, birthday, address, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [account_type, last_name, first_name, birthday, address, email, password]
    );
  }

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

  // add a teacher to the database, a user must be created first
  async insertTeacher(teacher_id, course_ids, schedule) {
    return await this.execute(`INSERT INTO teachers (teacher_id, course_ids, schedule) VALUES ($1, $2, $3)`, [
      teacher_id,
      course_ids,
      schedule,
    ]);
  }

  // add a parent to the database, a user must be created first
  async insertParent(parent_id, children_ids) {
    return await this.execute(`INSERT INTO parents (parent_id, children_ids) VALUES ($1, $2)`, [
      parent_id,
      children_ids,
    ]);
  }

  // add a school to the database
  async insertSchool(name, address, phone, principal_id) {
    return await this.execute(`INSERT INTO schools (name, address, phone, principal_id) VALUES ($1, $2, $3, $4)`, [
      name,
      address,
      phone,
      principal_id,
    ]);
  }

  // add course to the database
  async insertCourse(course_name, teacher_id, student_ids, student_grades) {
    return await this.execute(
      `INSERT INTO courses (course_name, teacher_id, student_ids, student_grades) VALUES ($1, $2, $3, $4)`,
      [course_name, teacher_id, student_ids, student_grades]
    );
  }
}

module.exports = {
  ClassyDB,
};
