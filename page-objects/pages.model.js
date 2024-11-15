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
        return await this.getElementByAttribute('textarea[placeholder="Page title"]');
    }

    async getPageContentInput() {
        return await this.getElementByAttribute('div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]');
    }

    async getPreviewButton() {
        return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-preview"]');
    }

    async getPublishButton() {
        return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]');
    }

    async getUpdateButton() {
        return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-save"]');
    }

    async getUnpublishButton() {
        return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="update-flow"]');
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

    async getTagInput(){
        return await this.getElementByAttribute('div[id="tag-input"] input[class="ember-power-select-trigger-multiple-input"]');
    }

    async selectFirstTag(){
        return await this.getElementByAttribute('li[data-option-index="0"]');
    }

    async getPublishedModal() {
        return await this.getElementByAttribute('div[data-test-publish-flow="complete"]')
    }

    async getCloseModalButton() {
        return await this.getElementByAttribute('button[data-test-button="close-publish-flow"]');
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
        let pagesButton = await this.getElementByAttribute('a[data-test-link="pages"]');
        return await pagesButton.click();
    }

    async publishPageNow() {
        let publishButton = await this.getPublishButton();
        let continueButton = await this.getContinuePublishButton();
        let confirmButton = await this.getConfirmPublishButton();
        await publishButton.click();
        await continueButton.click();
        return await confirmButton.click();
    }

    async previewPage() {
        let previewButton = await this.getPreviewButton();
        return await previewButton.click();

    }

    async updatePage() {
        let updateButton = await this.getUpdateButton();
        return await updateButton.click();

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

    async closePublishedModal() {
        let closeModalButton = await this.getCloseModalButton();
        return await closeModalButton.click();
    }

    async getPageByTitle(title, tool='playwright') {
        if (tool === 'kraken') {
            return await this.getElementByAttribute(`a.gh-post-list-title:nth-child(1)`);
        } else{
            return await this.getElementByAttribute(`a.gh-post-list-title:has-text("${title}")`);
        }
    }

    async goToPublishedPages(){
        let optionLists = await this.getElementByAttribute('span[class="ember-power-select-selected-item"]');
        await optionLists.click();
        let publishedPagesButton = await this.getElementByAttribute('li[data-option-index="2"]');
        return await publishedPagesButton.click();
    }

    async goToTagPages(){
        let tagsLists = await this.getElementByAttribute('div[data-test-tag-select="true"] span[class="ember-power-select-selected-item"]');
        await tagsLists.click();
        let tagPagesButton = await this.getElementByAttribute('li[data-option-index="1"]');
        return await tagPagesButton.click();
    }

    async openCurrentPageForm(title, tool='playwright') {
        let pageForm = await this.getPageByTitle(title, tool);
        return await pageForm.click();
    }

    async showUpdatedPage() {
        return await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]');
    }

    async showUnpublishedPage() {
        return await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]');
    }

    async unPublishPage() {
        let unpublishButton = await this.getUnpublishButton();
        let revertButton = await this.getRevertToDraftButton();
        await unpublishButton.click();
        return await revertButton.click();

    }

    async showTagPage(title, tool='playwright') {
        return await this.getPageByTitle(title, tool);
    }
}

module.exports = Pages;
