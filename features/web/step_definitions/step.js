const assert = require("chai").assert;
const { faker } = require("@faker-js/faker");
const { Given, When, Then } = require("@cucumber/cucumber");
const pageTitle = faker.lorem.words(3);

When(
  "I login with email {kraken-string} and password {kraken-string}",
  async function (email, password) {
    return await this.login.login(email, password);
  }
);

When("I go to members section", async function () {
  return await this.navBar.goToMembers();
});

When("I go to pages section", async function () {
  return await this.navBar.goToPages();
});

When("I return to pages section", async function () {
    return await this.pages.returnToPages();
});

When("I go back to members section", async function () {
  return await this.navBar.goToMembers();
});

When("I open member form", async function () {
  return await this.members.openNewMemberForm();
});

When("I open page form", async function () {
    return await this.pages.openNewPageForm();
});

When("I fill page form", async function () {
  await this.pages.fillPageTitle(pageTitle);
  await this.pages.fillPageContent(faker.lorem.paragraphs(3));
  return;
});

When("I add member name and invalid email", async function () {
  await this.members.fillName(faker.person.fullName());
  await this.members.fillEmail(faker.word.sample());
  return;
});

When("I add all the required member data", async function () {
  await this.members.fillName(faker.person.fullName());
  await this.members.fillEmail(faker.internet.email());
  return;
});

When("I submit the creation form empty", async function () {
  return await this.members.saveNewMember();
});

When("I submit the creation form with invalid email", async function () {
  return await this.members.saveNewMember();
});

When("I go to posts section", async function () {

  return await this.navBar.goToPosts();
});

When("I open post form", async function () {
    return await this.posts.openPostForm();
});

When("I fill post form", async function () {
    await this.posts.fillTitle(faker.lorem.words(3));
    await this.posts.fillContent(faker.lorem.paragraphs(3));
    return;
});

When("I schedule post", async function () {
  return await this.posts.schedulePost();
});

When("I draft the post", async function () {
  return await this.posts.draftAPost();
});

When("I publish post", async function () {
    return await this.posts.publishPost();
});

When("I delete the post", async function () {
  return await this.posts.deletePosts();
});

When("I go to published posts section", async function () {
  return await this.posts.publishedPosts();
});

When("I select the first post", async function () {
  return await this.posts.selectPostByTitle(pageTitle, 'kraken');
});

When("I update a post", async function () {
  return await this.posts.updatePost();
});

When("I select the all filter", async function () {
  await this.posts.selectType();
  return await this.posts.selectFirstFilterOption();
});

When("I select the access filter", async function () {
  await this.posts.selectAccess();
  return await this.posts.selectThirdFilterOption();
});

When("I select the author filter", async function () {
  await this.posts.selectAuthors();
  return await this.posts.selectSecondFilterOption();
});

When("I select the tag filter", async function () {
  await this.posts.selectTags();
  return await this.posts.selectSecondFilterOption();
});

When("I select the order", async function () {
  await this.posts.selectOrder();
  return await this.posts.selectSecondFilterOption();
});

Then(
  "The url now shouldn't have parameters",
  async function () {
    const { expect } = await import("expect-webdriverio");
    return await expect(this.driver).toHaveUrl(
      expect.stringContaining("/ghost/#/posts"),
      { atEnd: true }
    );
  }
);

Then(
  "The url now should have visibility for members parameter",
  async function () {
    const { expect } = await import("expect-webdriverio");
    return await expect(this.driver).toHaveUrl(
      expect.stringContaining("visibility=members"),
      { atEnd: true }
    );
  }
);

Then(
  "The url now should have the author parameter",
  async function () {
    const { expect } = await import("expect-webdriverio");
    return await expect(this.driver).toHaveUrl(
      expect.stringContaining("author="),
      { atEnd: true }
    );
  }
);

Then(
  "The url now should have the news tag parameter",
  async function () {
    const { expect } = await import("expect-webdriverio");
    return await expect(this.driver).toHaveUrl(
      expect.stringContaining("tag=news"),
      { atEnd: true }
    );
  }
);

Then(
  "The url now should have the order parameter",
  async function () {
    const { expect } = await import("expect-webdriverio");
    return await expect(this.driver).toHaveUrl(
      expect.stringContaining("?order=published_at%20asc"),
      { atEnd: true }
    );
  }
);



When("I submit the creation form with correct data", async function () {
  return await this.members.saveNewMember();
});


When("I publish page", async function () {
    return await this.pages.publishPageNow();
});

When("I preview page", async function () {
    return await this.pages.previewPage();
});


When("I close the published page modal", async function () {
    return await this.pages.closePublishedModal();
});

When("I open current page form", async function () {
    await this.pages.goToPublishedPages();
    return await this.pages.openCurrentPageForm(pageTitle, 'kraken');
});

When("I fill page form with new title and content", async function () {
    await this.pages.fillPageTitle(faker.lorem.words(3));
    await this.pages.fillPageContent(faker.lorem.paragraphs(3));
    return;
});

When("I update page", async function () {
    return await this.pages.updatePage();
});

When("I update page tag", async function () {
    return await this.pages.updatePageTag();
});

When("I return to pages", async function () {
    return await this.pages.returnToPages();
});

When("I go to tag pages", async function () {
    return await this.pages.goToTagPages();
});

When("I edit published status to unpublished", async function () {
    return await this.pages.unPublishPage();
});

Then(
  "Form should display error {kraken-string} for empty email",
  async function (errorMessage) {
    assert(
      (await this.members.getEmailInputError()) === errorMessage,
      "The error message does not match expected one"
    );
  }
);

Then(
  "Form should display error {kraken-string} for invalid email",
  async function (errorMessage) {
    assert(
      (await this.members.getEmailInputError()) === errorMessage,
      "The error message does not match expected one"
    );
  }
);

Then("warning modal opens", async function () {
  assert.exists(
    await this.members.getWarningModal(),
    "The modal is not opening"
  );
});

Then("I continue leaving the new member form", async function () {
  return await this.members.discardChanges();
});

Then("the browser redirects to members list", async function () {
  const { expect } = await import("expect-webdriverio");
  return await expect(this.driver).toHaveUrl(
    expect.stringContaining("/members"),
    { atEnd: true }
  );
});

Then("it should render member actions button", async function () {
  const button = await this.members.getMemberActionsButton();
  return await assert.isTrue(await button.isDisplayed());
});

Then("it should render signup info", async function () {
  return await assert(
    (await this.members.getSignupInfo()) === "SIGNUP INFO",
    "The site does not show the member signup info"
  );
});

Then("I should see the published page confirmation", async function () {
    const published = await this.pages.getPublishedPage();
    return await assert.isTrue(await published.isDisplayed());
});

Then("I should see the page in the admin section as a draft", async function () {
    const draft = await this.pages.getPageByTitle(pageTitle, 'kraken');
    console.log(draft);
    return await assert.isTrue(await draft.isDisplayed());
});

Then("I should see the preview of the new page", async function () {
    const preview = await this.pages.getPreviewPage();
    return await assert.isTrue(await preview.isDisplayed());
});

Then("I should see the updated notification", async function () {
    const update = await this.pages.showUpdatedPage();
    return await assert.isTrue(await update.isDisplayed());
});

Then("I should see revert to draft notification", async function () {
    const revert = await this.pages.showUnpublishedPage();
    return await assert.isTrue(await revert.isDisplayed());
});

Then("I should see the tagged page", async function () {
    const tag = await this.pages.showTagPage(pageTitle, 'kraken');
    return await assert.isTrue(await tag.isDisplayed());
});

Then("I should see the published post confirmation", async function () {
    const published = await this.posts.getPublishedModal();
    return await assert.isTrue(await published.isDisplayed());
});

Then("I should see the post in the admin section as a draft", async function () {
  const draft = await this.posts.getPostByTitle(pageTitle, 'kraken');
  console.log(draft);
  return await assert.isTrue(await draft.isDisplayed());
});

Then("I should see the update confirmation", async function () {
  const updated = await this.posts.confirmUpdate();
  return await assert.isTrue(await updated.isDisplayed());
});

Then("I shouldnt see the post in the admin section", async function () {
  const deleted = await this.posts.getPostByTitle(pageTitle, 'kraken');
  console.log(deleted);
  return await assert.isTrue(await deleted.isDisplayed());
});

