const { test, expect } = require("@playwright/test");
const properties = require("../../properties.json");
const Login = require("../../page-objects/login.model");
const NavBar = require("../../page-objects/nav-bar.model");
const Pages = require("../../page-objects/pages.model");
const Screenshots = require("../../page-objects/shared.model");
const Posts = require("../../page-objects/posts.model");
const Members = require("../../page-objects/members.model");
const Tags = require("../../page-objects/tags.model");
const PostPage = require("../../data-models/post-page.dto");
const TagDto = require("../../data-models/tag.dto");
const MemberDto = require("../../data-models/member.dto");
const { screenshotHandler, testIds, getScenarios } = require("../utils");

let login, navBar, pages, posts, members, screenshots, datapool, randomData, tags;

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
    test(`EP-01-${index + 1
      } Crear una página nueva y publicarla de inmediato`, async ({ page }) => {
        let { title, plaintext } = datapool?.[index] ?? {
          title: PostPage.dataGenerator.lorem.words(3),
          plaintext: PostPage.dataGenerator.lorem.paragraphs(3),
        };
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
    test(`EP-02-${index + 1
      } Crear una página nueva y guardarla como borrador`, async ({ page }) => {
        let { title, plaintext } = datapool?.[index] ?? {
          title: PostPage.dataGenerator.lorem.words(3),
          plaintext: PostPage.dataGenerator.lorem.paragraphs(3),
        };
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
    test(`EP-03-${index + 1
      } Crear una página nueva y previsualizar la publicación`, async ({
        page,
      }) => {
      let { title, plaintext } = datapool?.[index] ?? {
        title: PostPage.dataGenerator.lorem.words(3),
        plaintext: PostPage.dataGenerator.lorem.paragraphs(3),
      };
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
      let { title, plaintext } = datapool?.[index] ?? {
        title: PostPage.dataGenerator.lorem.words(3),
        plaintext: PostPage.dataGenerator.lorem.paragraphs(3),
      };
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
    test(`EP-07-${index + 1
      } Crear un post y programar fecha de lanzamiento`, async ({ page }) => {
        let { title, plaintext } = datapool?.[index] ?? {
          title: PostPage.dataGenerator.lorem.words(3),
          plaintext: PostPage.dataGenerator.lorem.paragraphs(3),
        };
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

test.describe("Feature: Crear tags", () => {
  test.beforeAll(async () => {
    datapool = await TagDto.dataArray();
  });
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    tags = new Tags(undefined, page, "rc");
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
    test(`EP-08-${index + 1} Crear un tag`, async ({
      page,
    }) => {
      let { name, accent_color, description } = datapool?.[index] ?? {
        name: TagDto.dataGenerator.lorem.words(3),
        accent_color: TagDto.dataGenerator.color.rgb({ prefix: '#' }),
        description: TagDto.dataGenerator.lorem.paragraphs(2),
      };
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToTags("And I go to tags section", navBar);
      await openTagsForm("And I open the tags form", tags);
      await fillTagsForm("And I fill the tag form", name, accent_color, description, tags);
      await publishTag("And I create the tag", tags);
      await navigateToTags("And I come back to tags section", navBar);
      await showTag(
        "Then I should see the created tag", name,
        tags
      );
    });
  });


  scenarios.forEach((key, index) => {
    test(`EP-09-${index + 1} Crear un tag y cambiar un tag existente`, async ({
      page,
    }) => {
      let { name, accent_color, description } = datapool?.[index] ?? {
        name: TagDto.dataGenerator.lorem.words(3),
        accent_color: TagDto.dataGenerator.color.rgb({ prefix: '#' }),
        description: TagDto.dataGenerator.lorem.paragraphs(2),
      };
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToTags("And I go to tags section", navBar);
      await openTagsForm("And I open the tags form", tags);
      await fillTagsForm("And I fill the tag form", name, accent_color, description, tags);
      await publishTag("And I create the tag", tags);
      await navigateToTags("And I come back to tags section", navBar);
      await selectTag("And I select the created tag", name, tags);
      await fillTagsForm("And I refill the tag form", name, accent_color, description, tags);
      await publishTag("And I save the tag", tags);
      await navigateToTags("And I come back to tags section", navBar);
      await showTag(
        "Then I should see the updated tag", name,
        tags
      );

    });
  });

});

test.describe("Feature: Crear miembros", () => {
  test.beforeAll(async () => {
    datapool = await MemberDto.dataArray();
  });
  test.beforeEach(async ({ page, browser }, testInfo) => {
    test.context = await browser.newContext();
    login = new Login(undefined, page);
    navBar = new NavBar(undefined, page);
    members = new Members(undefined, page);
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
    test(`EP-10-${index + 1} Crear un miembro`, async ({
      page,
    }) => {
      let { name, email, note } = datapool?.[index] ?? {
        name: MemberDto.dataGenerator.lorem.words(1),
        email: MemberDto.dataGenerator.lorem.words(1)+"@"+MemberDto.dataGenerator.lorem.words(1)+".com",
        note: MemberDto.dataGenerator.lorem.paragraphs(2),
      };
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToMembers("And I go to members section", navBar);
      await openMembersForm("And I open the members form", members);
      await fillMembersForm("And I fill the members form",name, email, note);
      await navigateToMembers("And I come back to members section", navBar);
      await showMember(
        "Then I should see the created member",name,
        members
      );
    });
  });
  scenarios.forEach((key, index) => {
    test(`EP-11-${index + 1} Editar un miembro`, async ({
      page,
    }) => {
      let { name, email, note } = datapool?.[index] ?? {
        name: MemberDto.dataGenerator.lorem.words(1),
        email: MemberDto.dataGenerator.lorem.words(1)+"@"+MemberDto.dataGenerator.lorem.words(1)+".com",
        note: MemberDto.dataGenerator.lorem.paragraphs(2),
      };
      let { name1, email1, note1 } = datapool?.[index] ?? {
        name1: MemberDto.dataGenerator.lorem.words(1),
        email1: MemberDto.dataGenerator.lorem.words(1)+"@"+MemberDto.dataGenerator.lorem.words(1)+".com",
        note1: MemberDto.dataGenerator.lorem.paragraphs(2),
      };
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToMembers("And I go to members section", navBar);
      await openMembersForm("And I open the members form", members);
      await fillMembersForm("And I fill the members form",name, email, note);
      await navigateToMembers("And I come back to members section", navBar);
      await selectMember("And I select the created member",name,members);
      await fillMembersForm("And I edit the members form",name1, email1, note1);
      await navigateToMembers("And I come back to members section", navBar);
      await showMember("Then I should see the edited member",name1,members);
    });
  });
  scenarios.forEach((key, index) => {
    test(`EP-12-${index + 1} Crear un miembro sin nombre`, async ({
      page,
    }) => {
      let { name, email, note } = datapool?.[index] ?? {
        name: "",
        email: MemberDto.dataGenerator.lorem.words(1)+"@"+MemberDto.dataGenerator.lorem.words(1)+".com",
        note: "",
      };
      await startLogin(`Given I navigate to page "${properties.URL}"`, page);
      await loginWithCredentials(
        `When I login with email "${properties.USERNAME}" and password "${properties.PASSWORD}"`,
        login
      );
      await navigateToMembers("And I go to members section", navBar);
      await openMembersForm("And I open the members form", members);
      await fillMembersForm("And I fill the members form",name, email, note);
      await navigateToMembers("And I come back to members section", navBar);
      await showMember(
        "Then I should see the created member",email,
        members
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

async function navigateToTags(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToTags();
    await screenshotHandler(screenshots, testIds);
  });
}

async function navigateToMembers(label, navBar) {
  await test.step(label, async () => {
    await navBar.goToMembers();
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

async function openTagsForm(label, tags) {
  await test.step(label, async () => {
    await tags.selectCreate();
    await screenshotHandler(screenshots, testIds);
  });
}

async function openMembersForm(label, members) {
  await test.step(label, async () => {
    await members.openNewMemberForm();
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

async function fillTagsForm(label, name, color, description, tags) {
  await test.step(label, async () => {
    await tags.putName(name);
    await tags.putDescription(description);
    await tags.putColor(color);
    await tags.saveButton();
    await screenshotHandler(screenshots, testIds);
  });
}

async function fillMembersForm(label,name, email, note) {
  await members.fillName(name);
  await members.fillEmail(email);
  await members.fillNote(note);
  await members.saveNewMember();
  await screenshotHandler(screenshots, testIds);
}

async function publishPageNow(label, pages) {
  await test.step(label, async () => {
    await pages.publishPageNow();
    await screenshotHandler(screenshots, testIds);
  });
}

async function publishTag(label, tags) {
  await test.step(label, async () => {
    await tags.saveButton();
    await screenshotHandler(screenshots, testIds);
  });
}


async function selectTag(label, name, tags) {
  await test.step(label, async () => {
    await tags.selectTag(name);
    await screenshotHandler(screenshots, testIds);
  });
}

async function showTag(label, name, tags) {
  await test.step(label, async () => {
    await expect(await tags.getTag(name)).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function showMember(label,name,members) {
  await test.step(label, async () => {
    await expect(await members.getMemberName(name)).toBeVisible();
    await screenshotHandler(screenshots, testIds);
  });
}

async function selectMember(label,name,members) {
  await test.step(label, async () => {
    await members.selectMemberName(name);
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
