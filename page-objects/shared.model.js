const fs = require('fs');
const screenshots_directory = './playwright-screenshots';

class Screenshots {
    constructor(page) {
        this.page = page;
    }

    async createDirectory(directory) {
        if (!fs.existsSync(screenshots_directory)) {
            fs.mkdirSync(screenshots_directory, {recursive: true});
        }
    }

    async pageScreenshot(url, scenario, step){
        await this.createDirectory(screenshots_directory);
        console.log('Taking screenshot for ' + url + '  ' + scenario + ' ' + step);
        await url.screenshot({
            path: screenshots_directory + '/' + scenario + '_' + (step) + '.png',
            fullPage: true,
        }).catch((err)=>{
            console.log(err);
        });
    }
}

module.exports = Screenshots;
