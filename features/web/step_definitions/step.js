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

When("I go back to members section", async function () {
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

When("I add all the required member data", async function () {
  await this.members.fillName(faker.person.fullName());
  await this.members.fillEmail(faker.internet.email());
  return;
});

When("I submit the creation form empty", async function () {
  return await this.members.saveNewMember();
});

When("I submit the creation form with invalid email", async function () {
  return await this.members.saveNewMember();
});

When("I submit the creation form with correct data", async function () {
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

Then("warning modal opens", async function () {
  assert.exists(
    await this.members.getWarningModal(),
    "The modal is not opening"
  );
});

Then("I continue leaving the new member form", async function () {
  return await this.members.discardChanges();
});

Then("the browser redirects to members list", async function () {
  const { expect } = await import("expect-webdriverio");
  return await expect(this.driver).toHaveUrl(
    expect.stringContaining("/members"),
    { atEnd: true }
  );
});

Then("it should render member actions button", async function () {
  const button = await this.members.getMemberActionsButton();
  return await assert.isTrue(await button.isDisplayed());
});

Then("it should render signup info", async function () {
  return await assert(
    (await this.members.getSignupInfo()) === "SIGNUP INFO",
    "The site does not show the member signup info"
  );
});
