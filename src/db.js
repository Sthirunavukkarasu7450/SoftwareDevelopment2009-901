// database module

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
      port: config.port
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
  
  // add a user to the database
  async insertUser(accountType, email, lastName, firstName, password) {
    return await this.execute(
      "INSERT INTO users (accountType, email, lastName, firstName, password) VALUES ($1, $2, $3, $4, $5)",
      [accountType, email, lastName, firstName, password]
    );
  }
}

module.exports = {
  ClassyDB
};
