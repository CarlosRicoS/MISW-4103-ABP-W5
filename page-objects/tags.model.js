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
        let buton = await this.getElementByAttribute("(//span[normalize-space()='New tag'])[1]");
        return await buton.click();
    }

    async putName(content) {
        let input = await this.getElementByAttribute("(//input[@id='tag-name'])[1]");
        await this.fillInput(input, content);
        return
    }

    async putDescription(content) {
        let input = await this.getElementByAttribute("(//textarea[@id='tag-description'])[1]");
        await this.fillInput(input, content);
        return
    }

    async putColor(content) {
        let input = await this.getElementByAttribute("(//div[@class='input-color'])[1]");
        await this.fillInput(input, content);
        return
    }

    async putSlug(content) {
        let input = await this.getElementByAttribute("(//input[@id='tag-slug'])[1]");
        await this.fillInput(input, content);
        return
    }

    async saveButton() {
        let buton = await this.getElementByAttribute("(//span[@data-test-task-button-state='idle'])[1]");
        return await buton.click();
    }

    async checkURL() {
        await this.sleep(2000)
        return await this.getCurrentUrl();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}

module.exports = Tags;