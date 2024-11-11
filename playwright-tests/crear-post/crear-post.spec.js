const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Posts = require("../../page-objects/posts.model");
let login, navBar, posts;

test.describe("Feature: Crear Post", () => {
    test.beforeEach(async ({ page, browser }) => {
        test.context = await browser.newContext();
        login = new Login(undefined, page);
        navBar = new NavBar(undefined, page);
        posts = new Posts(undefined, page);
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
        await navigateToPosts("And I go to posts section", navBar);
        await openPostForm("And I open post form", posts);
        await fillPostForm("And I fill post form", title, posts);
        await publishPost("And I publish post", posts);
        await showPublishedPost("Then I should see the published post confirmation", posts);
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
        await showPublishedPost("Then I should see the published post confirmation", posts);
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
        await showAdminPostSection("Then I should see the post in the admin section as a draft", title, posts);

    });
    test("EP-09 Actualizar un post ya publicado", async ({ page }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await publishedPosts("And I go to drafts posts", posts);

        await selectPostByTitle("And I select the first post", posts)
        await fillPostForm("And I fill post form",'suspendo ustilo studio', posts);
        await updatePost("And I update a post", posts);
        await showAdminPostSection("Then I should see the post in the admin section as a draft", title, posts);
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
        await postDeleted("Then I shouldnt see the post in the admin section", title, posts);
        
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

async function selectPostByTitle(label, title, posts) {
    await test.step(label, async () => {
        await expect(await posts.selectPostByTitle(title)).toBeVisible();
    });
}

async function showPublishedPost(label, posts) {
    await test.step(label, async () => {
        await expect(await posts.getPublishedModal()).toBeVisible();
    });
}

