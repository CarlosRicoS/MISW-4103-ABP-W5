const assert = require("chai").assert;
const { faker } = require("@faker-js/faker");
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

When("I add member name and invalid email", async function () {
  await this.members.fillName(faker.person.fullName());
  await this.members.fillEmail(faker.word.sample());
  return;
});

When("I submit the creation form empty", async function () {
  return await this.members.saveNewMember();
});

When("I submit the creation form with invalid email", async function () {
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

Then(
  "Form should display error {kraken-string} for invalid email",
  async function (errorMessage) {
    assert(
      (await this.members.getEmailInputError()) === errorMessage,
      "The error message does not match expected one"
    );
  }
);
