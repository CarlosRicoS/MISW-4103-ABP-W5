const PageObject = require("./page-object.abstract.model");

class Login extends PageObject {
  constructor(driver, page, version) {
    super(driver, page, version);
  }

  async getEmailInput() {
    return this.isRC
      ? await this.getElementByAttribute('input[name="identification"]')
      : await this.getElementById("#identification");
  }

  async getPasswordInput() {
    return this.isRC
      ? await this.getElementByAttribute('input[name="password"]')
      : await this.getElementById("#password");
  }

  async getSubmitButton() {
    return this.isRC
      ? await this.getElementByAttribute('button[type="submit"]')
      : await this.getElementById("#ember5");
  }

  async login(email, password) {
    let emailInput = await this.getEmailInput();
    let passwordInput = await this.getPasswordInput();
    await this.fillInput(emailInput, email);
    await this.fillInput(passwordInput, password);
    let submitButton = await this.getSubmitButton();
    return await submitButton.click();
  }
}

module.exports = Login;
