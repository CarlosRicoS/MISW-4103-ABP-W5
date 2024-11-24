const mockaroo = require("./mockaroo-client");

const getRecords = async (schemaName, count = 10) => {
  return await mockaroo.get(schemaName, count);
};

const priori_data = require("./priori-db.json");
const faker = require("@faker-js/faker").faker;
const getSection = (sectionName) => {
  return {
    index: 0,
    data: priori_data[sectionName],
    atIndex(index) {
      if (index >= this.data.length) {
        index = this.index;
      }
      this.index = index;
      return this.data[this.index];
    },
    next() {
      const value = this.data[this.index];
      if (this.index + 1 < this.data.length) {
        this.index++;
      }
      return value;
    },
  };
};

class DataGenerator {
  sectionName = null;
  constructor() {
    if (this.constructor == DataGenerator) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.data_type = process.env.DATA_TYPE;
  }

  getDataByIndex(index) {
    if (this.data_type !== "priori") return;
    return this.dataGenerator.atIndex(index);
  }

  getNextData() {
    if (this.data_type !== "priori") return;
    return this.dataGenerator.next();
  }

  getDataArray() {
    if (this.data_type !== "priori") return;
    return this.dataGenerator.data;
  }

  async getPseudoRandomData(count) {
    if (this.data_type !== "ps-rand") return;
    return await this.dataGenerator(this.sectionName, count);
  }

  get dataGenerator() {
    switch (this.data_type) {
      case "priori":
        return getSection(this.sectionName);
      case "ps-rand":
        return getRecords;
      case "rand":
      default:
        return faker;
    }
  }

  async dataArray() {
    switch (this.data_type) {
      case "priori":
        return this.getDataArray();
      case "ps-rand":
        return await this.getPseudoRandomData(10);
      case "rand":
      default:
        return null;
    }
  }
}

module.exports = DataGenerator;
