const { test, expect } = require("@playwright/test");

const properties = require("../../properties.json");
const { faker } = require("@faker-js/faker");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
let login, navBar, pages;

test.describe("Feature: Editar una página", () => {
    test.beforeEach(async ({ page, browser }) => {
        test.context = await browser.newContext();
        login = new Login(undefined, page);
        navBar = new NavBar(undefined, page);
        pages = new Pages(undefined, page);
    });
    test.afterEach(async ({ context }) => {
        await context.clearCookies();
        await context.clearPermissions();
        await test.context.close();
    });
    test("EP-04 Editar título y contenido de una página existente y publicarla", async ({ page }) => {
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
        await showPublishedPage("Then I should see the published page confirmation", pages);
        await closePublishedModal("And I close the published page modal", pages);
        await openCurrentPageForm("And I open current page form", title, pages);
        let newTitle = faker.lorem.words(3);
        let newContent = faker.lorem.paragraphs(3);
        await fillPageForm("And I fill page form with new title and content", newTitle, newContent, pages);
        await updatePage("And I update page", pages);
        await showUpdatedPage("Then I should see the updated notification", pages);
    });
    test("EP-05 Editar página publicada, cambiar a borrador y previsualizar", async ({ page }) => {
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
        await showPublishedPage("Then I should see the published page confirmation", pages);
        await closePublishedModal("And I close the published page modal", pages);
        await openCurrentPageForm("And I open current page form", title, pages);
        await unPublishPage("And I edit published status to unpublished", pages);
        await showUnpublishedPage("Then I should see revert to draft notification", pages);
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
        await showPublishedPage("Then I should see the published page confirmation", pages);
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



async function showPublishedPage(label, pages) {
    await test.step(label, async () => {
        await expect(await pages.getPublishedPage()).toBeVisible();
    });
}

async function returnToPages(label, pages) {
    await test.step(label, async () => {
        await pages.returnToPages();
    });
}


async function closePublishedModal(label, pages) {
    await test.step(label, async () => {
        await pages.closePublishedModal();
    });
}

async function openCurrentPageForm(label, title, pages) {
    await test.step(label, async () => {
        await pages.openCurrentPageForm(title);
    });
}

async function updatePage(label, pages) {
    await test.step(label, async () => {
        await pages.updatePage();
    });
}

async function updatePageTag(label, pages) {
    await test.step(label, async () => {
        await pages.updatePageTag();
    });
}

async function goToTagPages(label, pages) {
    await test.step(label, async () => {
        await pages.goToTagPages();
    });
}

async function showTagPage(label, title, pages) {
    await test.step(label, async () => {
        await expect(await pages.showTagPage(title)).toBeVisible();
    });
}

async function showUpdatedPage(label, pages) {
    await test.step(label, async () => {
        await expect(await pages.showUpdatedPage()).toBeVisible();
    });
}

async function unPublishPage(label, pages) {
    await test.step(label, async () => {
        await pages.unPublishPage();
    });
}


async function showUnpublishedPage(label, pages) {
    await test.step(label, async () => {
        await expect(await pages.showUnpublishedPage()).toBeVisible();
    });
}


