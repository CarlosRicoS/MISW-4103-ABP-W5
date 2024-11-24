const DataGenerator = require("./data-generator.abstract");

class Tag extends DataGenerator {
  sectionName = "tags";
  name;
  accent_color;
  description;

  constructor() {
    super();
  }

  getTagByIndex(index) {
    const tag = super.getDataByIndex(index);
    this.name = tag["name"];
    this.accent_color = tag["accent_color"];
    this.description = tag["description"];
    return this;
  }

  getNextTag() {
    const tag = super.getNextData();
    this.name = tag["name"];
    this.accent_color = tag["accent_color"];
    this.description = tag["description"];
    return this;
  }

  getTags() {
    return super.getDataArray();
  }

  async getPseudoRandomTags(count) {
    return await super.getPseudoRandomData(count);
  }
}

module.exports = new Tag();
