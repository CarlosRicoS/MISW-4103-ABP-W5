const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Members = require("../../page-objects/members.model");
let login, navBar, members;

test.describe("Feature: Registro de un miembro", () => {
  test.beforeEach(async ({ page, browser }) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    members = new Members(undefined, page);
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test("EP-017 Guardar miembro nuevo con formulario vacío.", async ({
    page,
  }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToMembers("And I go to members section", navBar);
    await openMemberForm("And I open member form", members);
    await saveNewMemberForm("And I submit the creation form empty", members);
    await test.step(`Then Form should display error "${properties.NEW_MEMBER_ERROR_MSG}" for empty email`, async () => {
      await expect(await members.getEmailInputError()).toEqual(
        properties.NEW_MEMBER_ERROR_MSG
      );
    });
  });
  test("EP-018 Guardar miembro nuevo con email inválido.", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToMembers("And I go to members section", navBar);
    await openMemberForm("And I open member form", members);
    await fillFormWrongEmail(
      "And I add member name and invalid email",
      members
    );
    await saveNewMemberForm(
      "And I submit the creation form with invalid email",
      members
    );
    await test.step(`Then Form should display error "${properties.EMAIL_MSG_MEMBER_CREATION}" for invalid email`, async () => {
      await expect(await members.getEmailInputError()).toEqual(
        properties.EMAIL_MSG_MEMBER_CREATION
      );
    });
  });
  test("EP-019 Mostrar advertencia al intentar salir de formulario de creación de miembro", async ({
    page,
  }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToMembers("And I go to members section", navBar);
    await openMemberForm("And I open member form", members);
    await navigateToMembers("And I go back to members section", navBar);
    await onWarningModalOpen("Then warning modal opens", members);
    await closeNewMemberForm(
      "And I continue leaving the new member form",
      members
    );
    await browserRedirectsToMemberList(
      "And the browser redirects to members list",
      page
    );
  });
  test("EP-020 Guardar nuevo miembro exitoso.", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToMembers("And I go to members section", navBar);
    await openMemberForm("And I open member form", members);
    await fillFormRightData("And I add all the required member data", members);
    await saveNewMemberForm(
      "And I submit the creation form with correct data",
      members
    );
    await showMemberActions(
      "Then it should render member actions button",
      members
    );
    await showSignUpInfo("And it should render signup info", members);
  });
});

async function startLogin(label, page) {
  await test.step(label, async () => {
    await page.goto(properties.URL);
  });
}

async function loginWithCredentials(label, login) {
  await test.step(label, async () => {
    await login.login(properties.USERNAME, properties.PASSWORD);
  });
}

async function navigateToMembers(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToMembers();
  });
}

async function openMemberForm(label, members) {
  await test.step(label, async () => {
    await members.openNewMemberForm();
  });
}

async function onWarningModalOpen(label, members) {
  await test.step(label, async () => {
    await expect(await members.getWarningModal()).toBeVisible();
  });
}

async function closeNewMemberForm(label, members) {
  await test.step(label, async () => {
    await members.discardChanges();
  });
}

async function browserRedirectsToMemberList(label, page) {
  await test.step(label, async () => {
    await expect(await page.url()).toMatch(/\/members$/);
  });
}

async function fillFormWrongEmail(label, members) {
  await test.step(label, async () => {
    await members.fillName(faker.person.fullName());
    await members.fillEmail(faker.word.sample());
  });
}

async function fillFormRightData(label, members) {
  await test.step(label, async () => {
    await members.fillName(faker.person.fullName());
    await members.fillEmail(faker.internet.email());
  });
}

async function saveNewMemberForm(label, members) {
  await test.step(label, async () => {
    await members.saveNewMember();
  });
}

async function showMemberActions(label, members) {
  await test.step(label, async () => {
    await expect(await members.getMemberActionsButton()).toBeVisible();
  });
}

async function showSignUpInfo(label, members) {
  await test.step(label, async () => {
    await expect(await members.getSignupInfo()).toEqual("SIGNUP INFO");
  });
}
