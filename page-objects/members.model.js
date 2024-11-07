const PageObject = require("./page-object.abstract.model");

class Members extends PageObject {
  constructor(driver, page) {
    super(driver, page);
  }

  async openNewMemberForm() {
    let newMemberButton = await this.getElementByAttribute(
      'a[href="#/members/new/"]'
    );
    return await newMemberButton.click();
  }

  async saveNewMember() {
    let saveNewMemberButton = await this.getElementByAttribute(
      'button[data-test-button="save"]'
    );
    return await saveNewMemberButton.click();
  }

  async getEmailInputError() {
    let errorLabel = await this.getElementByAttribute(
      "p.response:not([hidden])"
    );
    return await this.getInnerText(errorLabel);
  }

  async getNameFormInput() {
    return await this.getElementById("#member-name");
  }

  async getEmailFormInput() {
    return await this.getElementById("#member-email");
  }

  async fillName(name) {
    let inputName = await this.getNameFormInput();
    return await this.fillInput(inputName, name);
  }

  async fillEmail(email) {
    let inputEmail = await this.getEmailFormInput();
    return await this.fillInput(inputEmail, email);
  }
}

module.exports = Members;
