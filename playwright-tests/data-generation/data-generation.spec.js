const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
const Posts = require("../../page-objects/posts.model");
const Members = require("../../page-objects/members.model");
const PostPage = require("../../data-models/post-page.dto");
const { screenshotHandler, testIds, getScenarios } = require("../utils");

let login, navBar, pages, posts, members, screenshots, datapool;

const scenarios = getScenarios(4);

test.describe("Feature: Crear una página", () => {
  test.beforeAll(async () => {
    datapool = await PostPage.dataArray();
  });
  test.beforeEach(async ({ page, browser }, testInfo) => {
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
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });

  scenarios.forEach((key, index) => {
    test(`EP-01-${
      index + 1
    } Crear una página nueva y publicarla de inmediato`, async ({ page }) => {
      const { title, plaintext } = datapool[index];
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
  scenarios.forEach((key, index) => {
    test(`EP-02-${
      index + 1
    } Crear una página nueva y guardarla como borrador`, async ({ page }) => {
      const { title, plaintext } = datapool[index];
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToPages("And I go to pages section", navBar);
      await openPageForm("And I open page form", pages);
      await fillPageForm("And I fill page form", title, plaintext, pages);
      await returnToPages("And I return to pages section", pages);
      await showAdminPageSection(
        "Then I should see the page in the admin section as a draft",
        title,
        pages
      );
    });
  });
  scenarios.forEach((key, index) => {
    test(`EP-03-${
      index + 1
    } Crear una página nueva y previsualizar la publicación`, async ({
      page,
    }) => {
      const { title, plaintext } = datapool[index];
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToPages("And I go to pages section", navBar);
      await openPageForm("And I open page form", pages);
      await fillPageForm("And I fill page form", title, plaintext, pages);
      await previewPage("And I preview page", pages);
      await showPreviewPage(
        "Then I should see the preview of the new page",
        pages
      );
    });
  });
});

test.describe("Feature: Crear Post", () => {
  test.beforeAll(async () => {
    datapool = await PostPage.dataArray();
  });
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    posts = new Posts(undefined, page);
    screenshots = new Screenshots(undefined, page);
    testIds.scenarioId = testInfo.title.match(/^(EP-\d{0,5})/)[0];
    testIds.stepCounter = 1;
  });
  test.afterEach(async ({ context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await test.context.close();
  });
  scenarios.forEach((key, index) => {
    test(`EP-06-${index + 1} Crear un post en el mismo instante`, async ({
      page,
    }) => {
      const { title, plaintext } = datapool[index];
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToPosts("And I go to posts section", navBar);
      await openPostForm("And I open post form", posts);
      await fillPostForm("And I fill post form", title, plaintext, posts);
      await publishPost("And I publish post", posts);
      await showPublishedPost(
        "Then I should see the published post confirmation",
        posts
      );
    });
  });
  scenarios.forEach((key, index) => {
    test(`EP-07-${
      index + 1
    } Crear un post y programar fecha de lanzamiento`, async ({ page }) => {
      const { title, plaintext } = datapool[index];
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToPosts("And I go to posts section", navBar);
      await openPostForm("And I open post form", posts);
      await fillPostForm("And I fill post form", title, plaintext, posts);
      await schedulePost("And I schedule post", posts);
      await showPublishedPost(
        "Then I should see the published post confirmation",
        posts
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

async function navigateToPosts(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToPosts();
    await screenshotHandler(screenshots, testIds);
  });
}

async function openPostForm(label, posts) {
  await test.step(label, async () => {
    await posts.openPostForm();
    await screenshotHandler(screenshots, testIds);
  });
}

async function fillPostForm(label, title, content, posts) {
  await test.step(label, async () => {
    await posts.fillTitle(title);
    await posts.fillContent(content);
    await screenshotHandler(screenshots, testIds);
  });
}

async function publishPost(label, posts) {
  await test.step(label, async () => {
    await posts.publishPost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function schedulePost(label, posts) {
  await test.step(label, async () => {
    await posts.schedulePost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showPublishedPost(label, posts) {
  await test.step(label, async () => {
    await expect(await posts.getPublishedModal()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}
