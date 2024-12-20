class PageObject {
  driver = undefined;
  page = undefined;

  constructor(driver, page, version) {
    if (this.constructor == PageObject) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.driver = driver;
    this.page = page;
    this.version = version;
  }

  async fillInput(input, value) {
    return this.isKraken
      ? await input.setValue(value)
      : await input.fill(value);
  }

  async getElementById(cssId) {
    return this.isKraken
      ? await this.driver.$(cssId)
      : await this.page.locator(cssId);
  }

  async getElementByAttribute(cssAttr) {
    return this.isKraken
      ? await this.driver.$(cssAttr)
      : await this.page.locator(cssAttr);
  }

  async getFirstElementByAttribute(cssAttr) {
    return this.isKraken
      ? await this.driver.$(cssAttr)
      : await this.page.locator(cssAttr).first();
  }

  async getCurrentUrl() {
    return this.isKraken
      ? await this.driver.getCurrentUrl()
      : await this.page.url()
  }

  async getInnerText(element) {
    return this.isKraken ? await element.getText() : await element.innerText();
  }

  get isKraken() {
    return !!this.driver;
  }

  get isBS() {
    return !!this.version;
  }
}

module.exports = PageObject;
