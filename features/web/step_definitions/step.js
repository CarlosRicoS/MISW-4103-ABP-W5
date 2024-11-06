const assert = require("chai").assert;
const { Given, When, Then } = require("@cucumber/cucumber");

When(
  "I login with email {kraken-string} and password {kraken-string}",
  async function (email, password) {
    return await this.login.login(email, password);
  }
);

When("I go to members section", async function () {
  return await this.navBar.goToMembers();
});

When("I open member form", async function () {
  return await this.members.openNewMemberForm();
});

When("I submit the creation form empty", async function () {
  return await this.members.saveNewMember();
});

Then(
  "Form should display error {kraken-string} for empty email",
  async function (errorMessage) {
    assert(
      (await this.members.getEmailInputError()) === errorMessage,
      "The error message does not match expected one"
    );
  }
);
