// bare bones database class

const config = require("../config.json");
const { Client } = require("pg");

const { User } = require("../models/user");
const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { Parent } = require("../models/parent");
const { Course } = require("../models/course");

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

  // get a generic user from the database
  async getUser(email) {
    let results = await this.execute(`SELECT * FROM users WHERE email = $1`, [email]);
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
      return new User(results.rows[0]);
    }
  }

  // get student model class
  async getStudentModel(row) {
    // get additional student attributes
    let extra = await this.getStudent(row.user_id);
    return new Student({ ...row, ...extra });
  }

  // get parent model class
  async getParentModel(row) {
    // get additional parent attributes
    let extra = await this.getParent(row.user_id);
    return new Parent({ ...row, ...extra });
  }

  // get teacher model class
  async getTeacherModel(row) {
    // get additional teacher attributes
    let extra = await this.getTeacher(row.user_id);

    // get the courses for the teacher
    let courses = await this.execute(`SELECT * FROM courses WHERE teacher_id = $1`, [row.user_id]);
    courses = courses.rows.map((course) => new Course(course));

    return await new Teacher({ ...row, ...extra, courses });
  }

  // login a generic user using email and password
  async login(email, password) {
    let user = await this.getUser(email);
    if (user && user.password == password) {
      return user;
    }
  }
}

module.exports = {
  BaseDB,
};
