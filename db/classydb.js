// MAIN DATABASE API, inherits from all other database classes

const { BaseDB } = require("./base");
const { CourseDB } = require("./courses");
const { SchoolDB } = require("./schools");
const { ParentDB } = require("./parents");
const { StudentDB } = require("./students");
const { TeacherDB } = require("./teachers");

// helper function to combine multiple classes into one
function Classes(bases) {
  class Bases {
    constructor() {
      bases.forEach((base) => Object.assign(this, new base()));
    }
  }

  bases.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype)
      .filter((prop) => prop != "constructor")
      .forEach((prop) => (Bases.prototype[prop] = base.prototype[prop]));
  });

  return Bases;
}

class ClassyDB extends Classes([BaseDB, CourseDB, SchoolDB, ParentDB, StudentDB, TeacherDB]) {
  constructor() {
    super().connect();
  }
}

module.exports = {
  ClassyDB,
};
