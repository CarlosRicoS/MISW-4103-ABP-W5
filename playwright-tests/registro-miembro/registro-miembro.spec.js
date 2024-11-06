const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Members = require("../../page-objects/members.model");
let login, navBar, members;

test.describe("Feature: Registro de un miembro", () => {
  test.beforeEach(async ({ page }) => {
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    members = new Members(undefined, page);
  });
  test("EP-017 Guardar miembro nuevo con formulario vacío.", async ({
    page,
  }) => {
    await test.step(`Given I navigate to page "${properties.URL}"`, async () => {
      await page.goto(properties.URL);
    });
    await test.step(`When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`, async () => {
      login.login(properties.USERNAME, properties.PASSWORD);
    });
    await test.step("And I go to members section", async () => {
      navBar.goToMembers();
    });
    await test.step("And I open member form", async () => {
      members.openNewMemberForm();
    });
    await test.step("And I submit the creation form empty", async () => {
      members.saveNewMember();
    });
    await test.step(`Then Form should display error "${properties.NEW_MEMBER_ERROR_MSG}" for empty email`, async () => {
      await expect(await members.getEmailInputError()).toEqual(
        properties.NEW_MEMBER_ERROR_MSG
      );
    });
  });
});
