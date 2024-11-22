const PageObject = require("./page-object.abstract.model");

class NavBar extends PageObject {
  constructor(driver, page, version) {
    super(driver, page, version);
  }

  async goToMembers() {
    let membersOption = this.isBS
      ? await this.getElementByAttribute('li[class="relative"] a[href="#/members/"]')
      : await this.getElementByAttribute('a[href="#/members/"][data-test-nav="members"]');
    return await membersOption.click();
  }


  async goToPosts() {
    let postsOption = this.isBS
      ? await this.getElementByAttribute('li[class="gh-nav-list-new relative"] a[href="#/posts/"]')
      : await this.getElementByAttribute('a[href="#/posts/"][data-test-nav="posts"]');
    return await postsOption.click();
  }

  async goToPages() {
    let pagesOption = this.isBS
      ? await this.getElementByAttribute('a[href="#/pages/"]')
      : await this.getElementByAttribute('a[href="#/pages/"][data-test-nav="pages"]');
    return await pagesOption.click();
  }


  async goToTags() {
    let tagsOption = this.isBS
      ? await this.getElementByAttribute('a[href="#/tags/"]')
      : await this.getElementByAttribute('a[href="#/tags/"][data-test-nav="tags"]');
    return await tagsOption.click();
  }
}

module.exports = NavBar;
