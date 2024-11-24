const { time } = require("console");
const PageObject = require("./page-object.abstract.model");

class Pages extends PageObject {
  constructor(driver, page, version) {
    super(driver, page, version);
  }

  async openNewPageForm() {
    let newPageButton = await this.getElementByAttribute(
      'a[href="#/editor/page/"]'
    );
    return await newPageButton.click();
  }

  async getPageTitleInput() {
    return this.isBS
      ? await this.getElementByAttribute('textarea[placeholder="Page Title"]')
      : await this.getElementByAttribute('textarea[placeholder="Page title"]');
  }

  async getPageContentInput() {
    return this.isBS
      ? await this.getElementByAttribute('div[data-placeholder="Begin writing your page..."]')
      : await this.getElementByAttribute('div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]');
  }

  async getPublishMenu() {
    return await this.getElementByAttribute('div[class="gh-publishmenu ember-view"] div[role="button"]');
  }

  async getUpdateMenu() {
    return await this.getElementByAttribute('div[class="gh-publishmenu ember-view"] div[role="button"]');
  }


  async getPreviewButton() {
    return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-preview"]');
  }

  async getPublishButton() {
    return this.isBS
      ? this.getElementByAttribute('button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]')
      : this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]');
  }

  async getUpdateButton() {
    return this.isBS
      ? await this.getElementByAttribute('button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]')
      : await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-save"]');
  }

  async getUnpublishButton() {
    return this.isBS ? await this.getElementByAttribute('div[class="gh-publishmenu-radio "] div[class="gh-publishmenu-radio-button"]')
      : await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="update-flow"]');
  }

  async getContinuePublishButton() {
    return await this.getElementByAttribute('button[data-test-button="continue"]');
  }

  async getConfirmPublishButton() {
    return await this.getElementByAttribute('button[data-test-button="confirm-publish"]');
  }

  async getSettingsButton() {
    return await this.getElementByAttribute('button[data-test-psm-trigger]');
  }

  async getTagInput() {
    return await this.getElementByAttribute('div[id="tag-input"] input[class="ember-power-select-trigger-multiple-input"]');
  }

  async selectFirstTag() {
    return await this.getElementByAttribute('li[data-option-index="0"]');
  }

  async getPublishedModal() {
    return this.isBS
      ? await this.getElementByAttribute('article[class="gh-notification gh-notification-passive ember-view"]')
      : await this.getElementByAttribute('div[data-test-publish-flow="complete"]');
  }

  async getCloseModalButton() {
    return this.isBS
      ? await this.getElementByAttribute('button[class="gh-notification-close"]')
      : await this.getElementByAttribute('button[data-test-button="close-publish-flow"]');
  }

  async getRevertToDraftButton() {
    return await this.getElementByAttribute('button[data-test-button="revert-to-draft"]');
  }

  async getPreviewPage() {
    return await this.getElementByAttribute('iframe[class="gh-pe-iframe"]')
  }

  async fillPageTitle(title) {
    let inputTitle = await this.getPageTitleInput();
    return await this.fillInput(inputTitle, title);
  }

  async fillPageContent(content) {
    let inputContent = await this.getPageContentInput();
    await inputContent.click();
    return await this.fillInput(inputContent, content);
  }

  async returnToPages() {
    let pagesButton = this.isBS
      ? await this.getElementByAttribute('a[href="#/pages/"]')
      : await this.getElementByAttribute('a[data-test-link="pages"]');
    return await pagesButton.click();
  }

  async publishPageNow() {
    if (this.isBS) {
      let publishMenu = await this.getPublishMenu();
      let publishButton = await this.getPublishButton();
      await publishMenu.click();
      await publishButton.click();
      return;
    } else {
      let publishButton = await this.getPublishButton();
      let continueButton = await this.getContinuePublishButton();
      let confirmButton = await this.getConfirmPublishButton();
      await publishButton.click();
      await continueButton.click();
      return await confirmButton.click();
    }

  }
  
  async tryPublish() {
    let publishButton = await this.getPublishButton();
    await publishButton.click({timeout: 5000});
  }

  async previewPage() {
    let previewButton = await this.getPreviewButton();
    return await previewButton.click();

  }

  async updatePage() {
    if (this.isBS) {
      let updateMenu = await this.getUpdateMenu();
      let updateButton = await this.getUpdateButton();
      await updateMenu.click();
      return await updateButton.click();
    } else {
      let updateButton = await this.getUpdateButton();
      return await updateButton.click();

    }

  }

  async updatePageTag() {
    let settingsButton = await this.getSettingsButton();
    let tagInput = await this.getTagInput();
    let tag = await this.selectFirstTag();
    await settingsButton.click();
    await tagInput.click()
    await tag.click();
    return;
  }

  async getPublishedPage() {
    return await this.getPublishedModal();
  }

  async getErrorPage() {
    return await this.getElementByAttribute('[data-test-task-button-state="failure"]');
  }

  

  async closePublishedModal() {
    let closeModalButton = await this.getCloseModalButton();
    if (this.isBS) {
      await closeModalButton.click();
      await this.returnToPages();
      return;
    } else {
      return await closeModalButton.click();
    }

  }

  async getPageByTitle(title, tool = 'playwright') {
    if (tool === 'kraken') {
      return await this.getElementByAttribute(`a.gh-post-list-title:nth-child(1)`);
    } else {
      return await this.getFirstElementByAttribute(`a.gh-post-list-title:has-text("${title}")`);
    }
  }

  async goToPublishedPages() {
    let optionLists = await this.getElementByAttribute('span[class="ember-power-select-selected-item"]');
    await optionLists.click();
    let publishedPagesButton = await this.getElementByAttribute('li[data-option-index="2"]');
    return await publishedPagesButton.click();
  }

  async goToTagPages() {
    let tagsLists = await this.getElementByAttribute('div[data-test-tag-select="true"] span[class="ember-power-select-selected-item"]');
    await tagsLists.click();
    let tagPagesButton = await this.getElementByAttribute('li[data-option-index="1"]');
    return await tagPagesButton.click();
  }

  async openCurrentPageForm(title, tool = 'playwright') {
    let pageForm = await this.getPageByTitle(title, tool);
    return await pageForm.click();
  }


  async showUpdatedPage() {
    return this.isBS
      ? await this.getElementByAttribute('article[class="gh-notification gh-notification-passive ember-view"]')
      : await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]');
  }

  async showUnpublishedPage() {
    return this.isBS
      ? await this.getElementByAttribute('article[class="gh-notification gh-notification-passive ember-view"]')
      : await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]');
  }

  async unPublishPage() {
    if (this.isBS) {
      let updateMenu = await this.getUpdateMenu();
      let unpublishButton = await this.getUnpublishButton();
      let updateButton = await this.getUpdateButton();
      await updateMenu.click();
      await unpublishButton.click();
      await updateButton.click();
      return;
    } else {
      let unpublishButton = await this.getUnpublishButton();
      let revertButton = await this.getRevertToDraftButton();
      await unpublishButton.click();
      return await revertButton.click();
    }


  }

  async showTagPage(title, tool = 'playwright') {
    return await this.getPageByTitle(title, tool);
  }
}

module.exports = Pages;
