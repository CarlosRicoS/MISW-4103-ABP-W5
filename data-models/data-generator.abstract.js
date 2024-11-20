const priori_data = require("./priori-db.json");
const faker = require("@faker-js/faker");
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
    console.warn(this.dataGenerator);

    return this.dataGenerator.next();
  }

  get dataGenerator() {
    let generator;
    switch (this.data_type) {
      case "priori":
        return getSection(this.sectionName);
      case "ps-rand":
        return faker;
      case "rand":
        return faker;
      default:
        break;
    }
    return generator;
  }
}

module.exports = DataGenerator;
