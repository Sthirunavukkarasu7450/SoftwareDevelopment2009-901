// bare bones database class

const config = require("../config.json");
const { Client } = require("pg");

const { User } = require("../models/user");
const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { Parent } = require("../models/parent");
const { Course } = require("../models/course");
const { Admin } = require("../models/admin");

class BaseDB {
  // connect to the database
  connect() {
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

  // get a generic user by email from the database
  async getUserByEmail(email) {
    let results = await this.execute(`SELECT * FROM users WHERE email = $1`, [email]);
    return await this.convertUser(results);
  }

  // get a generic user by id from the database
  async getUserByID(user_id) {
    let results = await this.execute(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    return await this.convertUser(results);
  }

  // convert generic user to specific model class
  async convertUser(results) {
    if (results.rows.length == 0) {
      return null;
    }

    let account_type = results.rows[0].account_type;
    if (account_type == "student") {
      return await this.getStudentModel(results.rows[0]);
    } else if (account_type == "teacher") {
      return await this.getTeacherModel(results.rows[0]);
    } else if (account_type == "parent") {
      return await this.getParentModel(results.rows[0]);
    } else {
      return await this.getAdminModel(results.rows[0]);
    }
  }

  // get admin model class
  async getAdminModel(row) {
    // get all users from the database
    let results = await this.execute(`SELECT * FROM users`);
    let all_users = results.rows.map((row) => new User(row));
    return new Admin({ ...row, all_users });
  }

  // get student model class
  async getStudentModel(row) {
    // get additional student attributes
    let extra = await this.getStudent(row.user_id);
    if (extra == null) {
      return new Student(row);
    }

    // get the courses for the student
    let courses = [];
    if (extra.course_ids) {
      for (let course_id of extra.course_ids) {
        let course = await this.getCourse(course_id);
        courses.push(course);
      }
    }

    // get supervisors for the student
    let grade_principal = await this.getUserByID(extra.grade_principal_id);
    let counselor = await this.getUserByID(extra.counselor_id);
    let homeroom_teacher = await this.getUserByID(extra.homeroom_teacher_id);

    return new Student({ ...row, ...extra, courses, grade_principal, counselor, homeroom_teacher });
  }

  // get parent model class
  async getParentModel(row) {
    // get additional parent attributes
    let extra = await this.getParent(row.user_id);
    if (extra == null) {
      return new Parent(row);
    }

    // get the children for the parent
    let children = [];
    for (let child_id of extra.children_ids) {
      let child = await this.getUserByID(child_id);
      children.push(child);
    }

    return new Parent({ ...row, ...extra, children });
  }

  // get teacher model class
  async getTeacherModel(row) {
    // get additional teacher attributes
    let extra = await this.getTeacher(row.user_id);
    if (extra == null) {
      return new Teacher(row);
    }

    // get the courses for the teacher
    let courses = await this.execute(`SELECT * FROM courses WHERE teacher_id = $1`, [row.user_id]);
    courses = courses.rows.map((row) => new Course(row));

    // for each course, get the students from student_ids and store them in the course as students list
    for (let course of courses) {
      let students = await this.execute(`SELECT * FROM users WHERE user_id = ANY($1)`, [course.student_ids]);
      students = students.rows.map((row) => new Student(row));
      course.students = students;
    }

    return new Teacher({ ...row, ...extra, courses });
  }

  // login a generic user using email and password
  async login(email, password) {
    let user = await this.getUserByEmail(email);
    if (user && user.password == password) {
      return user;
    }
  }
}

module.exports = {
  BaseDB,
};
