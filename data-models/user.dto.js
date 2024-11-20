const DataGenerator = require("./data-generator.abstract");

class User extends DataGenerator {
  sectionName = "user";
  userName;
  password;

  constructor() {
    super();
  }

  getUserByIndex(index) {
    const user = super.getDataByIndex(index);
    this.userName = user["userName"];
    this.password = user["password"];
    return this;
  }

  getNextUser() {
    const user = super.getNextData();
    this.userName = user["userName"];
    this.password = user["password"];
    return this;
  }
}

module.exports = new User();
