const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
let login, navBar, pages, screenshots;

test.describe("Feature: Crear una página", () => {
    test.beforeEach(async ({ page, browser }) => {
        test.context = await browser.newContext();
        login = new Login(undefined, page);
        navBar = new NavBar(undefined, page);
        pages = new Pages(undefined, page);
        screenshots = new Screenshots(page);
    });
    test.afterEach(async ({ context }) => {
        await context.clearCookies();
        await context.clearPermissions();
        await test.context.close();
    });
    test("EP-01 Crear una página nueva y publicarla de inmediato", async ({ page }) => {
        await startLogin(`Given I navigate to page "${properties.URL}"`, page);
        await loginWithCredentials(
            `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
            login
        );
        await screenshots.pageScreenshot(page, "EP-01","01");
        await navigateToPages("And I go to pages section", navBar);
        await screenshots.pageScreenshot(page, "EP-01","02");
        await openPageForm("And I open page form", pages);
        await screenshots.pageScreenshot(page, "EP-01","03");
        let title = faker.lorem.words(3);
        let content = faker.lorem.paragraphs(3);
        await fillPageForm("And I fill page form", title, content, pages);
        await screenshots.pageScreenshot(page, "EP-01","04");
        await publishPageNow("And I publish page", pages);
        await screenshots.pageScreenshot(page, "EP-01","05");
        await showPublishedPage("Then I should see the published page confirmation", pages);
    });
    test("EP-02 Crear una página nueva y guardarla como borrador", async ({ page }) => {
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
        await returnToPages("And I return to pages section", pages);
        await showAdminPageSection("Then I should see the page in the admin section as a draft", title, pages);
    });
    test("EP-03 Crear una página nueva y previsualizar la publicación", async ({ page }) => {
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
        await previewPage("And I preview page", pages);
        await showPreviewPage("Then I should see the preview of the new page", pages);
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

async function navigateToPages(label, navBar) {
    await test.step(label, async () => {
        await navBar.goToPages();
    });
}

async function returnToPages(label, pages) {
    await test.step(label, async () => {
        await pages.returnToPages();
    });
}

async function openPageForm(label, pages) {
    await test.step(label, async () => {
        await pages.openNewPageForm();
    });
}

async function fillPageForm(label, title, content, pages) {
    await test.step(label, async () => {
        await pages.fillPageTitle(title);
        await pages.fillPageContent(content);
    });
}

async function publishPageNow(label, pages) {
    await test.step(label, async () => {
        await pages.publishPageNow();
    });
}

async function previewPage(label, pages) {
    await test.step(label, async () => {
        await pages.previewPage();
    });
}

async function showPublishedPage(label, pages) {
    await test.step(label, async () => {
        await expect(await pages.getPublishedPage()).toBeVisible();
    });
}

async function showAdminPageSection(label, title, pages) {
    await test.step(label, async () => {
        await expect(await pages.getPageByTitle(title)).toBeVisible();
    });
}

async function showPreviewPage(label, pages) {
    await test.step(label, async () => {
        await expect(await pages.getPreviewPage()).toBeVisible();
    });
}