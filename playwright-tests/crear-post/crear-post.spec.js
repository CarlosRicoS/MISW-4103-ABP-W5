const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Posts = require("../../page-objects/posts.model");
const Screenshots = require("../../page-objects/shared.model");
let login, navBar, posts, screenshots;

test.describe("Feature: Crear Post", () => {
    test.beforeEach(async ({ page, browser }) => {
        test.context = await browser.newContext();
        login = new Login(undefined, page);
        navBar = new NavBar(undefined, page);
        posts = new Posts(undefined, page);
        screenshots = new Screenshots(page);
    });
    test.afterEach(async ({ context }) => {
        await context.clearCookies();
        await context.clearPermissions();
        await test.context.close();
    });
    test("EP-06 Crear un post en el mismo instante", async ({ page }) => {
        let title = faker.lorem.words(3);
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await screenshots.pageScreenshot(page, "EP-06","01");
        await navigateToPosts("And I go to posts section", navBar);
        await screenshots.pageScreenshot(page, "EP-06","02");
        await openPostForm("And I open post form", posts);
        await screenshots.pageScreenshot(page, "EP-06","03");
        await fillPostForm("And I fill post form", title, posts);
        await screenshots.pageScreenshot(page, "EP-06","04");
        await publishPost("And I publish post", posts);
        await screenshots.pageScreenshot(page, "EP-06","05");
        await showPublishedPost("Then I should see the published post confirmation", posts);
        await screenshots.pageScreenshot(page, "EP-06","06");
    });
    test("EP-07 Crear un post y programar fecha de lanzamiento", async ({ page }) => {
        let title = faker.lorem.words(3);
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await openPostForm("And I open post form", posts);
        await fillPostForm("And I fill post form", title, posts);
        await schedulePost("And I schedule post", posts);
        await screenshots.pageScreenshot(page, "EP-07","05");
        await showPublishedPost("Then I should see the published post confirmation", posts);
        await screenshots.pageScreenshot(page, "EP-07","06");
    });
    test("EP-08 Guardar un post en la seccion de borradores", async ({ page }) => {
        let title = faker.lorem.words(3);
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await openPostForm("And I open post form", posts);
        await fillPostForm("And I fill post form",title, posts);
        await draftAPost("And I draft the post", posts);
        await screenshots.pageScreenshot(page, "EP-08","05");
        await showAdminPostSection("Then I should see the post in the admin section as a draft", title, posts);
        await screenshots.pageScreenshot(page, "EP-08","06");

    });
    test("EP-09 Actualizar un post", async ({ page }) => {

        let title = 'post a actualizar';
        let title2 = faker.lorem.words(3);
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await openPostForm("And I open post form", posts);
        await fillPostForm("And I fill post form",title, posts);
        await publishPost("And I publish post", posts);
        await publishedPosts("And I go to published posts section", posts);
        await selectPostByTitle("And I select the first post", title, posts)
        await fillPostForm("And I fill post form",title2, posts);
        await updatePost("And I update a post", posts);
        await screenshots.pageScreenshot(page, "EP-09","05");
        await confirmUpdate("Then I should see the update confirmation", posts);
        await screenshots.pageScreenshot(page, "EP-09","06");
    });
    test("EP-10 Eliminar un post", async ({ page }) => {
        let title = faker.lorem.words(3);
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await openPostForm("And I open post form", posts);
        await fillPostForm("And I fill post form",title, posts);
        await deletePosts("And I delete the post", posts);
        await screenshots.pageScreenshot(page, "EP-10","05");
        await postDeleted("Then I shouldnt see the post in the admin section", title, posts);
        await screenshots.pageScreenshot(page, "EP-10","06");
        
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

async function navigateToPosts(label, login) {
    await test.step(label, async () => {
        await navBar.goToPosts();
    });
}

async function openPostForm(label, posts) {
    await test.step(label, async () => {
        await posts.openPostForm();
    });
}

async function fillPostForm(label, title, posts) {
    await test.step(label, async () => {
        await posts.fillTitle(title);
        await posts.fillContent(faker.lorem.paragraphs(3));
    });
}

async function publishPost(label, posts) {
    await test.step(label, async () => {
        await posts.publishPost();
    });
}

async function schedulePost(label, posts) {
    await test.step(label, async () => {
        await posts.schedulePost();
    });
}

async function draftPosts(label, posts) {
    await test.step(label, async () => {
        await posts.draftPosts();
    });
}

async function publishedPosts(label, posts) {
    await test.step(label, async () => {
        await posts.publishedPosts();
    });
}


async function draftAPost(label, posts) {
    await test.step(label, async () => {
        await posts.draftAPost();
    });
}

async function selectPostByTitle(label, title, posts) {
    await test.step(label, async () => {
        await posts.selectPostByTitle(title);
    });
}


async function updatePost(label, posts) {
    await test.step(label, async () => {
        await posts.updatePost();
    });
}

async function deletePosts(label, posts) {
    await test.step(label, async () => {
        await posts.deletePosts();
    });
}



async function showAdminPostSection(label, title, posts) {
    await test.step(label, async () => {
        await expect(await posts.getPostByTitle(title)).toBeVisible();
    });
}

async function postDeleted(label, title, posts) {
    await test.step(label, async () => {
        await expect(await posts.getPostByTitle(title)).toBeHidden();
    });
}

async function confirmUpdate(label, posts) {
    await test.step(label, async () => {
        await expect(await posts.confirmUpdate()).toBeVisible();
    });
}

async function showPublishedPost(label, posts) {
    await test.step(label, async () => {
        await expect(await posts.getPublishedModal()).toBeVisible();
    });
}

