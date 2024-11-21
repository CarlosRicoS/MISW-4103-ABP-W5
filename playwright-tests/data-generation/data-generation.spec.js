const {test, expect} = require("@playwright/test");

const properties = require("../../properties.json");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
const Posts = require("../../page-objects/posts.model");
const Members = require("../../page-objects/members.model");
const PostPage = require("../../data-models/post-page.dto");
const {screenshotHandler, testIds} = require("../utils");

let login, navBar, pages, posts, members, screenshots, data_tuple;


data_tuple = PostPage.getPostPages().slice(0, 5);

test.describe("Feature: Crear una página", () => {
  test.beforeEach(async ({page, browser}, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    pages = new Pages(undefined, page);
    posts = new Posts(undefined, page);
    members = new Members(undefined, page);
    screenshots = new Screenshots(undefined, page);
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5}-\d{0,3})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({context}) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });

  data_tuple.forEach((tuple, index) => {
    test(`EP-01-${index + 1} Crear una página nueva y publicarla de inmediato`, async ({page,}) => {
      const {title, plaintext} = tuple;
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToPages("And I go to pages section", navBar);
      await openPageForm("And I open page form", pages);
      await fillPageForm("And I fill page form", title, plaintext, pages);
      await publishPageNow("And I publish page", pages);
      await showPublishedPage(
        "Then I should see the published page confirmation",
        pages
      );
    });
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

async function returnToPages(label, pages) {
  await test.step(label, async () => {
    await pages.returnToPages();
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

async function previewPage(label, pages) {
  await test.step(label, async () => {
    await pages.previewPage();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showPublishedPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPublishedPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showAdminPageSection(label, title, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPageByTitle(title)).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showPreviewPage(label, pages) {
  await test.step(label, async () => {
    await expect(await pages.getPreviewPage()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}
