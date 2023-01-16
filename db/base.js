// bare bones database class

const config = require("../config.json");
const { Client } = require("pg");

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
    return await this.execute(`SELECT * FROM users WHERE email = $1`, [email]);
  }

  // login a generic user using email and password
  async login(email, password) {
    user = await this.getUser(email);
    if (user.rows.length == 0) {
      return false;
    }
    if (user.rows[0].password != password) {
      return false;
    }

    data = user.rows[0];

    if (data.account_type == "admin") {
      return "adminPage.html";
    } else if (data.account_type == "parent") {
      return "parentPage.html";
    } else if (data.account_type == "teacher") {
      return "teacherPage.html";
    } else {
      return "studentPage.html";
    }
  }
}

module.exports = {
  BaseDB,
};
