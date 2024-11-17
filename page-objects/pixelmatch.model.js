import fs from 'fs';
import {PNG} from 'pngjs';
import pixelmatch from 'pixelmatch';
import {options} from "../vrt.config";

const properties = require("../properties.json");

const pixelmatchConfig = {
  screenshotsPath: undefined,
  reportPath: undefined,
};


class PixelmatchModel {

  constructor() {
    this.createDirectory(this.config.reportPath);
  }

  async createDirectory(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {recursive: true});
    }
  }


  async compareImages(scenario, step) {
    let resultInfo = {}
    const beforePath = `${this.config.screenshotsPath}/${scenario}_step-${step}_${properties.PREFIX_BS}.png`
    const afterPath = `${this.config.screenshotsPath}/${scenario}_step-${step}_${properties.PREFIX}.png`
    const diffPath = `${this.config.screenshotsPath}/${scenario}_step-${step}_diff.png`
    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));
    const {width, height} = img1;
    const diff = new PNG({width, height});
    const numDiffPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      options
    );
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    resultInfo = {
      numDiffPixels: numDiffPixels
    };
    return resultInfo;
  }

  async generateReport(reportInfo) {
    const browsers = ["firefox",];
    let report = undefined;
    report = await this.createReport(browsers, properties.URL_BS, properties.URL, reportInfo);
    fs.writeFileSync(`${this.config.reportPath}/vrt_playwright_report.html`, report);
    fs.copyFileSync('./static/index.css', `${this.config.reportPath}/index.css`);
    console.log('Pixelmatch report generated');
  }

  browser(b, stepInfo) {
    return `<div class="browser" id="${stepInfo.scenario}_step-${stepInfo.step}">
        <div class=" btitle">
            <h2>Step: ${stepInfo.step}</h2>
            <p>Data: ${JSON.stringify(stepInfo.result)}</p>
        </div>
        <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Reference</span>
                <img class="img2" src=".${this.config.screenshotsPath}/${stepInfo.scenario}_step-${stepInfo.step}_${properties.PREFIX_BS}.png" alt="Reference image">
            </div>
            <div class="imgcontainer">
                <span class="imgname">Test</span>
                <img class="img2" src=".${this.config.screenshotsPath}/${stepInfo.scenario}_step-${stepInfo.step}_${properties.PREFIX}.png" alt="Test image">
            </div>
        </div>
        <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Diff</span>
                <img class="imgfull" src=".${this.config.screenshotsPath}/${stepInfo.scenario}_step-${stepInfo.step}_diff.png" alt="Diff image">
            </div>
        </div>
    </div>`;
  }

  async createReport(browsers, bs_url, rc_url, reportInfo) {
    return `
    <html>
        <head>
            <title>Pixelmatch - Playwright | VRT Report</title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <header>
                <h1>Pixelmatch - Playwright | VRT Report</h1>
                <p>Generated for BASE URL: <a href="${bs_url}" target="_blank">${bs_url}</a></p>
                <p>Generated for RC URL: <a href="${rc_url}" target="_blank">${rc_url}</a></p>
            </header>
            <main id="visualizer">
                ${reportInfo.map(stepInfo => `
                    <section class="scenario">
                        <h2>Scenario: ${stepInfo.scenario}</h2>
                        ${browsers.map(b => this.browser(b, stepInfo)).join('')}
                    </section>
                `).join('')}
            </main>
        </body>
    </html>`;
  }

  get config() {
    return {
      ...pixelmatchConfig,
      screenshotsPath: properties.PLAYWRIGHT_OUTPUT_DIRECTORY,
      reportPath: properties.VRT_PLAYWRIGHT,
    };
  }
}

module.exports = PixelmatchModel;
