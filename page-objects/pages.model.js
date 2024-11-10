const PageObject = require("./page-object.abstract.model");

class Pages extends PageObject {
    constructor(driver, page) {
        super(driver, page);
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

    async getPublishedPage() {
        return await this.getPublishedModal();
    }

    async closePublishedModal() {
        let closeModalButton = await this.getCloseModalButton();
        return await closeModalButton.click();
    }

    async getPageByTitle(title) {
        return await this.page.locator(`a.gh-post-list-title:has-text("${title}")`);
    }

    async openCurrentPageForm(title) {
        let pageForm = await this.getPageByTitle(title);
        return await pageForm.click();
    }

    async showUpdatedPage() {
        return await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]:has-text("Page updated")');
    }

    async showUnpublishedPage() {
        return await this.getElementByAttribute('aside[class="gh-notifications"] div[data-test-text="notification-content"] span[class="gh-notification-title"]:has-text("Page reverted to a draft.")');
    }

    async unPublishPage() {
        let unpublishButton = await this.getUnpublishButton();
        let revertButton = await this.getRevertToDraftButton();
        await unpublishButton.click();
        return await revertButton.click();

    }
}

module.exports = Pages;
