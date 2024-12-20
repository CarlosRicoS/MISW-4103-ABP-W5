const PageObject = require("./page-object.abstract.model");

class Posts extends PageObject {
    constructor(driver, page, version) {
        super(driver, page, version);
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
        let button = this.isBS
          ? await this.getElementByAttribute('section[class="view-actions"] a[href="#/editor/post/"]')
          : await this.getElementByAttribute('a[data-test-new-post-button]');
        return await button.click();
    }

    async fillTitle(name) {
        let inputTitle = this.isBS
          ? await this.getElementByAttribute('textarea[placeholder="Post Title"]')
          : await this.getElementByAttribute("textarea[placeholder=\"Post title\"]");
        await this.fillInput(inputTitle, name);
        return;
    }

    async fillContent(content) {
        let inputContent = this.isBS
          ? await this.getElementByAttribute('div[data-placeholder="Begin writing your post..."]')
          : await this.getElementByAttribute('div[data-secondary-instance="false"] p[data-koenig-dnd-droppable="true"]');
        await inputContent.click();
        return await this.fillInput(inputContent, content);
    }

    async publishPost() {
        if (this.isBS) {
            let publishMenu = await this.getElementByAttribute('div[class="gh-publishmenu ember-view"] div[role="button"]')
            let publishButton = await this.getElementByAttribute('button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
            await publishMenu.click();
            await publishButton.click();
            return;
        } else {
            let publishButton = await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]');
            let continueButton = await this.getElementByAttribute('button[data-test-button="continue"]');
            let confirmButton = await this.getElementByAttribute('button[data-test-button="confirm-publish"]');
            await publishButton.click();
            await continueButton.click();
            await confirmButton.click({force: true});
            return;
        }

    }

    async publishedPosts() {
        let skipConfirmation = await this.getElementByAttribute('button[data-test-button="close-publish-flow"]');
        let goToPublished = await this.getElementByAttribute('a[href="#/posts/?type=published"]'); 
        await skipConfirmation.click();
        await goToPublished.click();
        return;
    }

    async schedulePost() {
        if (this.isBS) {
            let publishMenu = await this.getElementByAttribute('div[class="gh-publishmenu ember-view"] div[role="button"]');
            let publishButton = await this.getElementByAttribute('button[class="gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view"]');
            let scheduleButton = await this.getElementByAttribute('div[class="gh-publishmenu-radio "] div[class="gh-publishmenu-radio-button"]');
            await publishMenu.click();
            await scheduleButton.click();
            await publishButton.click();
            return;
        } else {
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
    }

    async draftAPost(){
        let goBackToPosts = await this.getElementByAttribute('a[data-test-link="posts"]');
        await goBackToPosts.click({force: true});
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

    async tryPublish() {
        let publishButton = await this.getElementByAttribute('header[class="gh-editor-header br2 pe-none"] button[data-test-button="publish-flow"]')
        await publishButton.click({timeout: 5000});
    }
    async getErrorPost() {
        return await this.getElementByAttribute('[data-test-task-button-state="failure"]');
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
        return this.isBS
          ? await this.getElementByAttribute('article[class="gh-notification gh-notification-passive ember-view"]')
          : await this.getElementByAttribute('div[data-test-publish-flow="complete"]')
    }

    async confirmUpdate() {
        return await this.getElementByAttribute('div[data-test-text="notification-content"]')
    }
}

module.exports = Posts;