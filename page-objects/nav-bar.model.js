const PageObject = require("./page-object.abstract.model");

class NavBar extends PageObject {
  constructor(driver, page) {
    super(driver, page);
  }

  async goToMembers() {
    let membersOption = await this.getElementByAttribute(
      'a[href="#/members/"][data-test-nav="members"]'
    );
    return await membersOption.click();
  }


  async goToPosts() {
    let postsOption = await this.getElementByAttribute(
      'a[href="#/posts/"][data-test-nav="posts"]'
    );
    return await postsOption.click();
  }

  async goToPages() {
      let pagesOption = await this.getElementByAttribute(
      'a[href="#/pages/"][data-test-nav="pages"]'
      );
      return await pagesOption.click();
  }
}

module.exports = NavBar;
