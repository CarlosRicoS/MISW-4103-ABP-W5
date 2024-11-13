const PageObject = require("./page-object.abstract.model");

class Posts extends PageObject {
    constructor(driver, page) {
        super(driver, page);
    }


    async selectType() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="All posts"])[1]'
        );
        return await filter.click();
    }

    async selectAccess() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="All access"])[1]'
        );
        return await filter.click();
    }

    async selectAuthors() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="All authors"])[1]'
        );
        return await filter.click();
    }


    async selectTags() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="All tags"])[1]'
        );
        return await filter.click();
    }

    async selectOrder() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="Newest first"])[1]'
        );
        return await filter.click();
    }

    async selectFirstFilterOption() {
        let filter = await this.getElementByAttribute(
            '[data-option-index="0"]'
        );
        return await filter.click();
    }

    async selectSecondFilterOption() {
        let filter = await this.getElementByAttribute(
            '[data-option-index="1"]'
        );
        return await filter.click();
    }

    async selectThirdFilterOption() {
        let filter = await this.getElementByAttribute(
            '[data-option-index="2"]'
        );
        return await filter.click();
    }


    async checkURL() {
        await this.sleep(2000)
        return await this.getCurrentUrl();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async openPostForm() {
        let button = await this.getElementByAttribute(
            'a[data-test-new-post-button]'
        );
        return await button.click();
    }

    async fillTitle(name) {
        let inputTitle = await this.getElementByAttribute("textarea[placeholder=\"Post title\"]");
        await this.fillInput(inputTitle, name);
        return;
    }

    async fillContent(content) {
        let inputContent = await await this.getElementByAttribute('div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]');
        await inputContent.click();
        return await this.fillInput(inputContent, content);
    }

    async publishPost() {
        let publishButton = await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]');
        let continueButton = await this.getElementByAttribute('button[data-test-button="continue"]');
        let confirmButton = await this.getElementByAttribute('button[data-test-button="confirm-publish"]');
        await publishButton.click();
        await continueButton.click();
        await confirmButton.click({force: true});
        return;
    }

    async publishedPosts() {
        let skipConfirmation = await this.getElementByAttribute('button[data-test-button="close-publish-flow"]');
        let goToPublished = await this.getElementByAttribute('a[href="#/posts/?type=published"]'); 
        await skipConfirmation.click();
        await goToPublished.click();
        return;
    }

    async schedulePost() {
        let publishButton = await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]');
        let scheduleButton = await this.getElementByAttribute('div[data-test-setting="publish-at"] button[class="gh-publish-setting-title "]');
        let programSchedule = await this.getElementByAttribute('div[class="gh-publish-schedule"] div[class="gh-radio "]');
        let continueButton = await this.getElementByAttribute('button[data-test-button="continue"]');
        let confirmButton = await this.getElementByAttribute('button[data-test-button="confirm-publish"]');
        await publishButton.click();
        await scheduleButton.click();
        await programSchedule.click();
        await continueButton.click();
        await confirmButton.click({force: true});
        return;
    }

    async draftPosts() {
        let goToDrafts = await this.getElementByAttribute('a[href="#/posts/?type=draft"]'); 
        await goToDrafts.click();
        return;
    }

    async draftAPost(){
        let goBackToPosts = await this.getElementByAttribute('a[data-test-link="posts"]');
        await goBackToPosts.click();
        return;
    }

    async updatePost () {
        let updateButton = await this.getUpdateButton();
        await updateButton.click();
        return;
    }

    async deletePosts () {
        let settingsButton = await this.getSettingsButton();
        let deleteAPost = await this.getElementByAttribute('button[data-test-button="delete-post"]');
        let confirmDelete = await this.getElementByAttribute('button[data-test-button="delete-post-confirm"]')
        await settingsButton.click();
        await deleteAPost.click();
        await confirmDelete.click();
        return;
    }

    async getPostByTitle(title, tool='playwright') {
        if (tool === 'kraken') {
            return await this.getElementByAttribute(`a.gh-post-list-title:nth-child(1)`);
        } else{
            return await this.getElementByAttribute(`a.gh-post-list-title:has-text("${title}")`);
        }
    }

    async selectPostByTitle(title, tool='playwright') {
        if (tool === 'kraken') {
            let postSelected =  await this.getElementByAttribute(`a.gh-post-list-title:nth-child(1)`);
            await postSelected.click()
        } else{
            let postSelected = await this.getElementByAttribute(`a.gh-post-list-title:has-text("${title}")`);
            await postSelected.click()
        }
        return;
    }

    async getUpdateButton() {
        return await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-save"]');
    }

    async getSettingsButton() {
        return await this.getElementByAttribute('button[data-test-psm-trigger]');
    }

    async getPublishedModal() {
        return await this.getElementByAttribute('div[data-test-publish-flow="complete"]')
    }

    async confirmUpdate() {
        return await this.getElementByAttribute('div[data-test-text="notification-content"]')
    }
}

module.exports = Posts;