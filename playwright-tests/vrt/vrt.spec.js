const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
const Posts = require("../../page-objects/posts.model");
const Members = require("../../page-objects/members.model");
const PixelmatchModel = require("../../page-objects/pixelmatch.model");
const screenshotHandler = require("../utils").screenshotHandler;
const pixelmatchHandler = require("../utils").pixelmatchHandler;
const testIds = require("../utils").testIds;

let login, navBar, pages, posts, members, screenshots, pixelmatch;

let reportInfo = [];

test.describe("Feature: Crear una página", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page, "bs");
    navBar = new NavBar(undefined, page, "bs");
    pages = new Pages(undefined, page, "bs");
    posts = new Posts(undefined, page, "bs");
    members = new Members(undefined, page, "bs");
    screenshots = new Screenshots(undefined, page, "bs");
    pixelmatch = new PixelmatchModel();
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test.afterAll(async () => {
    await pixelmatch.generateReport(reportInfo);
  });
  test("EP-01 Crear una página nueva y publicarla de inmediato", async ({page,}) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
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
  });
  test("EP-02 Crear una página nueva y guardarla como borrador", async ({
                                                                          page,
                                                                        }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPages("And I go to pages section", navBar);
    await openPageForm("And I open page form", pages);
    let title = faker.lorem.words(3);
    let content = faker.lorem.paragraphs(3);
    await fillPageForm("And I fill page form", title, content, pages);
    await returnToPages("And I return to pages section", pages);
    await showAdminPageSection(
      "Then I should see the page in the admin section as a draft",
      title,
      pages
    );
  });
});

test.describe("Feature: Editar una página", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page, "bs");
    navBar = new NavBar(undefined, page, "bs");
    pages = new Pages(undefined, page, "bs");
    screenshots = new Screenshots(undefined, page, "bs");
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
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
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
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
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
});


test.describe("Feature: Crear Post", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page, "bs");
    navBar = new NavBar(undefined, page, "bs");
    posts = new Posts(undefined, page, "bs");
    screenshots = new Screenshots(undefined, page, "bs");
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test.afterAll(async () => {
    await pixelmatch.generateReport(reportInfo);
  });
  test("EP-06 Crear un post en el mismo instante", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await openPostForm("And I open post form", posts);
    await fillPostForm("And I fill post form", posts);
    await publishPost("And I publish post", posts);
    await showPublishedPost(
      "Then I should see the published post confirmation",
      posts
    );
  });
  test("EP-07 Crear un post y programar fecha de lanzamiento", async ({
                                                                        page,
                                                                      }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await openPostForm("And I open post form", posts);
    await fillPostForm("And I fill post form", posts);
    await schedulePost("And I schedule post", posts);
    await showPublishedPost(
      "Then I should see the published post confirmation",
      posts
    );
  });
});


test.describe("Feature: Visualizar los post", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page, "bs");
    navBar = new NavBar(undefined, page, "bs");
    posts = new Posts(undefined, page, "bs");
    screenshots = new Screenshots(undefined, page, "bs");
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test.afterAll(async () => {
    await pixelmatch.generateReport(reportInfo);
  });
  test("EP-011 Ver todos los posts", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await selectFilterAll("And I select the all filter", posts);
    await test.step(`The url now shouldn't have parameters `, async () => {
      await expect(await getCurrentUrl(posts)).toEqual(
        "http://localhost:2369/ghost/#/posts"
      );
    });
  });

  test("EP-012 Ver posts para miembros", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await selectFilterAccess("And I select the access filter", posts);
    await test.step(`The url now should have visibility for members parameter`, async () => {
      await expect(await getCurrentUrl(posts)).toEqual(
        "http://localhost:2369/ghost/#/posts?visibility=members"
      );
    });
  });
});

test.describe("Feature: Registro de un miembro", () => {
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page, "bs");
    navBar = new NavBar(undefined, page, "bs");
    members = new Members(undefined, page, "bs");
    screenshots = new Screenshots(undefined, page, "bs");
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  test.afterAll(async () => {
    await pixelmatch.generateReport(reportInfo);
  });
  test("EP-017 Guardar miembro nuevo con formulario vacío.", async ({
                                                                      page,
                                                                    }) => {
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
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
    await startLogin(`Given I navigate to page "${properties.URL_BS}"`, page);
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
});

async function startLogin(label, page) {
  await test.step(label, async () => {
    await page.goto(properties.URL_BS);
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function loginWithCredentials(label, login) {
  await test.step(label, async () => {
    await login.login(properties.USERNAME, properties.PASSWORD);
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function navigateToPages(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToPages();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function returnToPages(label, pages) {
  await test.step(label, async () => {
    await pages.returnToPages();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function openPageForm(label, pages) {
  await test.step(label, async () => {
    await pages.openNewPageForm();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function fillPageForm(label, title, content, pages) {
  await test.step(label, async () => {
    await pages.fillPageTitle(title);
    await pages.fillPageContent(content);
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function publishPageNow(label, pages) {
  await test.step(label, async () => {
    await pages.publishPageNow();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function showPublishedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPublishedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function showAdminPageSection(label, title, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPageByTitle(title)).toBeVisible();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}


async function closePublishedModal(label, pages) {
  await test.step(label, async () => {
    await pages.closePublishedModal();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function openCurrentPageForm(label, title, pages) {
  await test.step(label, async () => {
    await pages.openCurrentPageForm(title);
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function updatePage(label, pages) {
  await test.step(label, async () => {
    await pages.updatePage();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function showUpdatedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.showUpdatedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function unPublishPage(label, pages) {
  await test.step(label, async () => {
    await pages.unPublishPage();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function showUnpublishedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.showUnpublishedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}


async function navigateToPosts(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToPosts();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function openPostForm(label, posts) {
  await test.step(label, async () => {
    await posts.openPostForm();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function fillPostForm(label, posts) {
  await test.step(label, async () => {
    await posts.fillTitle(faker.lorem.words(3));
    await posts.fillContent(faker.lorem.paragraphs(3));
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function publishPost(label, posts) {
  await test.step(label, async () => {
    await posts.publishPost();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function schedulePost(label, posts) {
  await test.step(label, async () => {
    await posts.schedulePost();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function showPublishedPost(label, posts) {
  await test.step(label, async () => {
    await expect(await posts.getPublishedModal()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function selectFilterAccess(label, posts) {
  await test.step(label, async () => {
    await posts.selectAccess();
    await posts.selectThirdFilterOption();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function selectFilterAll(label, posts) {
  await test.step(label, async () => {
    await posts.selectType();
    await posts.selectFirstFilterOption();
    await screenshotHandler(screenshots, testIds);
  });
}

async function getCurrentUrl(posts) {
  return posts.checkURL();
}

async function navigateToMembers(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToMembers();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function openMemberForm(label, members) {
  await test.step(label, async () => {
    await members.openNewMemberForm();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function fillFormWrongEmail(label, members) {
  await test.step(label, async () => {
    await members.fillName(faker.person.fullName());
    await members.fillEmail(faker.word.sample());
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

async function saveNewMemberForm(label, members) {
  await test.step(label, async () => {
    await members.saveNewMember();
    await screenshotHandler(screenshots, testIds);
    reportInfo.push(await pixelmatchHandler(pixelmatch, testIds));
  });
}

