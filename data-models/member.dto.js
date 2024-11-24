const DataGenerator = require("./data-generator.abstract");

class Member extends DataGenerator {
  sectionName = "members";
  name;
  email;
  note;

  constructor() {
    super();
  }

  getMemberByIndex(index) {
    const member = super.getDataByIndex(index);
    this.name = member["name"];
    this.email = member["email"];
    this.note = member["note"];
    return this;
  }

  getNextMember() {
    const member = super.getNextData();
    this.name = member["name"];
    this.email = member["email"];
    this.note = member["note"];
    return this;
  }

  getMembers() {
    return super.getDataArray();
  }

  async getPseudoRandomMembers(count) {
    return await super.getPseudoRandomData(count);
  }
}

module.exports = new Member();
