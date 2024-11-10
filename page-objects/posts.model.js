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


}

module.exports = Posts;