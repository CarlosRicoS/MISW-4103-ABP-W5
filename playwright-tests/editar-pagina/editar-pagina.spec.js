const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
const screenshotHandler = require("../utils").screenshotHandler;
const testIds = require("../utils").testIds;
let login, navBar, pages, screenshots;

test.describe("Feature: Editar una página", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    pages = new Pages(undefined, page);
    screenshots = new Screenshots(undefined, page);
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test("EP-04 Editar título y contenido de una página existente y publicarla", async ({
    page,
  }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPages("And I go to pages section", navBar);
    await openPageForm("And I open page form", pages);
    let title = faker.lorem.words(3);
    let content = faker.lorem.paragraphs(3);
    await fillPageForm("And I fill page form", title, content, pages);
    await publishPageNow("And I publish page", pages);
    await showPublishedPage(
      "Then I should see the published page confirmation",
      pages
    );
    await closePublishedModal("And I close the published page modal", pages);
    await openCurrentPageForm("And I open current page form", title, pages);
    let newTitle = faker.lorem.words(3);
    let newContent = faker.lorem.paragraphs(3);
    await fillPageForm(
      "And I fill page form with new title and content",
      newTitle,
      newContent,
      pages
    );
    await updatePage("And I update page", pages);
    await showUpdatedPage("Then I should see the updated notification", pages);
  });
  test("EP-05 Editar página publicada, cambiar a borrador y previsualizar", async ({
    page,
  }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPages("And I go to pages section", navBar);
    await openPageForm("And I open page form", pages);
    let title = faker.lorem.words(3);
    let content = faker.lorem.paragraphs(3);
    await fillPageForm("And I fill page form", title, content, pages);
    await publishPageNow("And I publish page", pages);
    await showPublishedPage(
      "Then I should see the published page confirmation",
      pages
    );
    await closePublishedModal("And I close the published page modal", pages);
    await openCurrentPageForm("And I open current page form", title, pages);
    await unPublishPage("And I edit published status to unpublished", pages);
    await showUnpublishedPage(
      "Then I should see revert to draft notification",
      pages
    );
  });
  test("EP-16 Editar una página asignando un tag", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPages("And I go to pages section", navBar);
    await openPageForm("And I open page form", pages);
    let title = faker.lorem.words(3);
    let content = faker.lorem.paragraphs(3);
    await fillPageForm("And I fill page form", title, content, pages);
    await publishPageNow("And I publish page", pages);
    await showPublishedPage(
      "Then I should see the published page confirmation",
      pages
    );
    await closePublishedModal("And I close the published page modal", pages);
    await openCurrentPageForm("And I open current page form", title, pages);
    await updatePageTag("And I update page tag", pages);
    await updatePage("And I update page", pages);
    await showUpdatedPage("Then I should see the updated notification", pages);
    await returnToPages("And I return to pages", pages);
    await goToTagPages("And I go to tag pages", pages);
    await showTagPage("Then I should see the tagged page", title, pages);
  });
});

async function startLogin(label, page) {
  await test.step(label, async () => {
    await page.goto(properties.URL);
    await screenshotHandler(screenshots, testIds);
  });
}

async function loginWithCredentials(label, login) {
  await test.step(label, async () => {
    await login.login(properties.USERNAME, properties.PASSWORD);
    await screenshotHandler(screenshots, testIds);
  });
}

async function navigateToPages(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToPages();
    await screenshotHandler(screenshots, testIds);
  });
}

async function openPageForm(label, pages) {
  await test.step(label, async () => {
    await pages.openNewPageForm();
    await screenshotHandler(screenshots, testIds);
  });
}

async function fillPageForm(label, title, content, pages) {
  await test.step(label, async () => {
    await pages.fillPageTitle(title);
    await pages.fillPageContent(content);
    await screenshotHandler(screenshots, testIds);
  });
}

async function publishPageNow(label, pages) {
  await test.step(label, async () => {
    await pages.publishPageNow();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showPublishedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPublishedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function returnToPages(label, pages) {
  await test.step(label, async () => {
    await pages.returnToPages();
    await screenshotHandler(screenshots, testIds);
  });
}

async function closePublishedModal(label, pages) {
  await test.step(label, async () => {
    await pages.closePublishedModal();
    await screenshotHandler(screenshots, testIds);
  });
}

async function openCurrentPageForm(label, title, pages) {
  await test.step(label, async () => {
    await pages.openCurrentPageForm(title);
    await screenshotHandler(screenshots, testIds);
  });
}

async function updatePage(label, pages) {
  await test.step(label, async () => {
    await pages.updatePage();
    await screenshotHandler(screenshots, testIds);
  });
}

async function updatePageTag(label, pages) {
  await test.step(label, async () => {
    await pages.updatePageTag();
    await screenshotHandler(screenshots, testIds);
  });
}

async function goToTagPages(label, pages) {
  await test.step(label, async () => {
    await pages.goToTagPages();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showTagPage(label, title, pages) {
  await test.step(label, async () => {
    await expect(await pages.showTagPage(title)).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showUpdatedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.showUpdatedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function unPublishPage(label, pages) {
  await test.step(label, async () => {
    await pages.unPublishPage();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showUnpublishedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.showUnpublishedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}
