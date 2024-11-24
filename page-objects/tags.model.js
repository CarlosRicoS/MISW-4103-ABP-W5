const PageObject = require("./page-object.abstract.model");

class Tags extends PageObject {
    constructor(driver, page, version) {
        super(driver, page, version);
    }


    async selectType() {
        let filter = await this.getElementByAttribute(
            '(//*[normalize-space()="All Tags"])[1]'
        );
        return await filter.click();
    }

    async selectCreate() {
        let buton = await this.getElementByAttribute('(//span[normalize-space()="New tag"])[1]');
        return await buton.click();
    }

    async putName(content) {
        let input = await this.getElementByAttribute('#tag-name');
        await this.fillInput(input, content);
        return
    }

    async putDescription(content) {
        let input = await this.getElementByAttribute('#tag-description');
        await this.fillInput(input, content);
        return
    }

    async putColor(content) {

        content = String(content);

        if (content.startsWith("#")) {
            content = content.slice(1);
        }

        let input = await this.getElementByAttribute('input[name="accent-color"][type="text"]');
        await this.fillInput(input, content);
        return;
    }

    async putSlug(content) {
        let input = await this.getElementByAttribute('#tag-slug');
        await this.fillInput(input, content);
        return
    }

    async saveButton() {
        let buton = await this.getElementByAttribute('span:has-text("Save")');
        return await buton.click();
    }

    async checkURL() {
        await this.sleep(2000)
        return await this.getCurrentUrl();
    }


    async checkTag(name) {
        let tagcard = await this.getElementByAttribute(`(//h3[normalize-space()="${name}"])[1]`);
        if (!tagcard) {
            return true
        } else {
            return false
        }
    }

    async selectTag(name) {
        let tagcard = await this.getElementByAttribute(`(//h3[normalize-space()="${name}"])[1]`);
        return await tagcard.click();
    }

    async getTag(name) {
        let tagcard = await this.getElementByAttribute(`(//h3[normalize-space()="${name}"])[1]`);
        return await tagcard;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}

module.exports = Tags;