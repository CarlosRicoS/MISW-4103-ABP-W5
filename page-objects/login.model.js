const PageObject = require("./page-object.abstract.model");

class Login extends PageObject {
  constructor(driver, page) {
    super(driver, page);
  }

  async getEmailInput() {
    return await this.getElementById("#identification");
  }

  async getPasswordInput() {
    return await this.getElementById("#password");
  }

  async getSubmitButton() {
    return await this.getElementById("#ember5");
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
