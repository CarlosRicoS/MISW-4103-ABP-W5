const DataGenerator = require("./data-generator.abstract");

class PostPage extends DataGenerator {
  sectionName = "post-page";
  title;
  plaintext;

  constructor() {
    super();
  }

  getPostPageByIndex(index) {
    const postPage = super.getDataByIndex(index);
    this.title = postPage["title"];
    this.plaintext = postPage["plaintext"];
    return this;
  }

  getNextPostPage() {
    const postPage = super.getNextData();
    this.title = postPage["title"];
    this.plaintext = postPage["plaintext"];
    return this;
  }

  getPostPages() {
    return super.getDataArray();
  }
}

module.exports = new PostPage();