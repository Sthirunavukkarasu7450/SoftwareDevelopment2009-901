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
    let results = await this.execute(`SELECT * FROM users WHERE email = $1`, [email]);
    if (results.rows.length == 0) {
      return null;
    }

    let account_type = results.rows[0].account_type;
    if (account_type == "student") {
      // get additional student attributes
      let extra = await this.getStudent(results.rows[0].user_id);
      return new Student({ ...results.rows[0], ...extra });
    } else if (account_type == "teacher") {
      // get additional teacher attributes
      let extra = await this.getTeacher(results.rows[0].user_id);
      return new Teacher({ ...results.rows[0], ...extra });
    } else if (account_type == "parent") {
      // get additional parent attributes
      let extra = await this.getParent(results.rows[0].user_id);
      return new Parent({ ...results.rows[0], ...extra });
    } else {
      return new User(results.rows[0]);
    }
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
