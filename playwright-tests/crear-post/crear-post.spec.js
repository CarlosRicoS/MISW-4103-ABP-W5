const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Posts = require("../../page-objects/posts.model");
const Screenshots = require("../../page-objects/shared.model");
const screenshotHandler = require("../utils").screenshotHandler;
const testIds = require("../utils").testIds;
let login, navBar, posts, screenshots;

test.describe("Feature: Crear Post", () => {
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
  test("EP-06 Crear un post en el mismo instante", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
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
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
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
  test("EP-08 Guardar un post en la seccion de borradores y luego crearlo", async ({
    page,
  }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await openPostForm("And I open post form", posts);
    await fillPostForm("And I fill post form", posts);
    await draftAPost("And I draft the post", posts);
    //PPENDIENTE SELECCIONAR PRIMER DRAFTTT
    await publishPost("And I publish post", posts);
    await showPublishedPost(
      "Then I should see the published post confirmation",
      posts
    );
  });
  test("EP-09 Actualizar un post ya publicado", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await draftPosts("And I draft and publish post", posts);
    await updatePost("And I update a post", navBar);
    //PPENDIENTE SELECCIONAR PRIMER POST
    await showPublishedPost(
      "Then I should see the published post confirmation",
      posts
    );
  });
  test("EP-10 Eliminar un post desde los borradores", async ({ page }) => {
    await startLogin(`Given I navigate to page "${properties.URL}"`, page);
    await loginWithCredentials(
      `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
      login
    );
    await navigateToPosts("And I go to posts section", navBar);
    await draftPosts("And I draft and publish post", posts);
    //PPENDIENTE SELECCIONAR PRIMER Borrador
    await deletePosts("And I delete the post", posts);

    await showPublishedPost(
      "Then I should see the published post confirmation",
      posts
    );
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

async function navigateToPosts(label, login) {
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

async function fillPostForm(label, posts) {
  await test.step(label, async () => {
    await posts.fillTitle(faker.lorem.words(3));
    await posts.fillContent(faker.lorem.paragraphs(3));
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

async function draftPosts(label, posts) {
  await test.step(label, async () => {
    await posts.draftPost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function draftAPost(label, posts) {
  await test.step(label, async () => {
    await posts.draftAPost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function updatePost(label, posts) {
  await test.step(label, async () => {
    await posts.updatePost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function deletePost(label, posts) {
  await test.step(label, async () => {
    await posts.deletePost();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showPublishedPost(label, posts) {
  await test.step(label, async () => {
    await expect(await posts.getPublishedModal()).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}
