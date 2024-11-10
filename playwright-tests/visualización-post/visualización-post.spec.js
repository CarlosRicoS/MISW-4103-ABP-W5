const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Posts = require("../../page-objects/posts.model");
let login, navBar, posts;

test.describe("Feature: Visualizar los post", () => {
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
    test("EP-011 Ver todos los posts", async ({
        page,
    }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await selectFilterAll("And I select the all filter", posts);
        await test.step(`The url now shouldn't have parameters `, async () => {
            await expect(await getCurrentUrl(posts)).toEqual(
                "http://localhost:2368/ghost/#/posts"
            );
        });
    });


    test("EP-012 Ver posts para miembros", async ({
        page,
    }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await selectFilterAccess("And I select the access filter", posts);
        await test.step(`The url now should have visibility for members parameter`, async () => {
            await expect(await getCurrentUrl(posts)).toEqual(
                "http://localhost:2368/ghost/#/posts?visibility=members"
            );
        });
    });



    test("EP-013 Ver posts de un solo autor", async ({
        page,
    }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await selectFilterAuthor("And I select the author filter", posts);
        await test.step(`The url now should have the autor parameter`, async () => {
            await expect(await getCurrentUrl(posts)).toEqual(
                "http://localhost:2368/ghost/#/posts?author=jamie"
            );
        });
    });


    test("EP-014 Ver posts de un tag", async ({
        page,
    }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await selectFilterTags("And I select the tag filter", posts);
        await test.step(`The url now should have the news tag parameter`, async () => {
            await expect(await getCurrentUrl(posts)).toEqual(
                "http://localhost:2368/ghost/#/posts?tag=news"
            );
        });
    });


    test("EP-015 Ver post ordenados de manera ascendente", async ({
        page,
    }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await navigateToPosts("And I go to posts section", navBar);
        await selectOrder("And I select the order", posts);
        await test.step(`The url now should have the order parameter`, async () => {
            await expect(await getCurrentUrl(posts)).toEqual(
                "http://localhost:2368/ghost/#/posts?order=published_at%20asc"
            );
        });
    });

});


async function getCurrentUrl(posts) {
    return posts.checkURL();
}

async function startLogin(label, page) {
    await test.step(label, async () => {
        await page.goto(properties.URL);
    });
}


async function selectFilterAll(label, posts) {
    await test.step(label, async () => {
        await posts.selectType();
        await posts.selectFirstFilterOption();

    });
}

async function selectFilterAccess(label, posts) {
    await test.step(label, async () => {
        await posts.selectAccess();
        await posts.selectThirdFilterOption();

    });
}


async function selectFilterAuthor(label, posts) {
    await test.step(label, async () => {
        await posts.selectAuthors();
        await posts.selectSecondFilterOption();

    });
}

async function selectFilterTags(label, posts) {
    await test.step(label, async () => {
        await posts.selectTags();
        await posts.selectSecondFilterOption();

    });
}

async function selectOrder(label, posts) {
    await test.step(label, async () => {
        await posts.selectOrder();
        await posts.selectSecondFilterOption();

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
