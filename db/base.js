// bare bones database class

const config = require("../config.json");
const { Client } = require("pg");

const { User } = require("../models/user");
const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { Parent } = require("../models/parent");

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
    results = this.execute(`SELECT * FROM users WHERE email = $1`, [email]);
    if (results.rows.length == 0) {
      return null;
    }

    account_type = results.rows[0].account_type;
    if (account_type == "student") {
      return new Student(results.rows[0]);
    } else if (account_type == "teacher") {
      return new Teacher(results.rows[0]);
    } else if (account_type == "parent") {
      return new Parent(results.rows[0]);
    } else {
      return new User(results.rows[0]);
    }
  }

  // login a generic user using email and password
  // async login(email, password) {
  //   user = await this.getUser(email);

  //   // check password
  //   if (password != user.password) {
  //     return false;
  //   }

  //   if (user.account_type == "admin") {
  //     return "adminPage.html";
  //   } else if (user.account_type == "parent") {
  //     return "parentPage.html";
  //   } else if (user.account_type == "teacher") {
  //     return "teacherPage.html";
  //   } else {
  //     return "studentPage.html";
  //   }
  // }
}

module.exports = {
  BaseDB,
};
