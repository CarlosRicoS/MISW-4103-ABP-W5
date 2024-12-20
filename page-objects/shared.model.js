const fs = require("fs");
const properties = require("../properties.json");

const playWrightScreenShot = async (config) => {
  const { driver, scenario, step, outputPath, prefix } = config;
  return await driver
    .screenshot({
      path: `${outputPath}/${scenario}_step-${step}_${prefix}.png`
    })
    .catch((err) => {
      console.log(err);
    });
};

const krakenScreenShot = async (config) => {
  const { driver, scenario, step, outputPath, prefix } = config;
  return await driver.saveScreenshot(
    `${outputPath}/${scenario}_${step}_0_document_0_.png`
  );
};

const screenShotConfig = {
  driver: undefined,
  scenario: undefined,
  step: undefined,
  prefix: undefined,
  outputPath: undefined,
};

class Screenshots {
  driver = undefined;
  page = undefined;
  version = undefined;

  constructor(driver, page, version) {
    this.driver = driver;
    this.page = page;
    this.version = version;
    this.createDirectory(this.config.outputPath);
  }

  async createDirectory(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  async pageScreenshot(scenario, step) {
    let config = {
      ...this.config,
      scenario: scenario,
      step: step,
    };
    console.log(
      `Taking screenshot for ${config.prefix} -> ${config.scenario}-${config.step}`
    );
    this.isKraken
      ? await krakenScreenShot(config)
      : await playWrightScreenShot(config);
  }

  get isKraken() {
    return !!this.driver;
  }

  get isBS(){
    return !!this.version;
  }

  get config() {
    return {
      ...screenShotConfig,
      driver: this.isKraken ? this.driver : this.page,
      outputPath: this.isKraken
        ? this.isBS 
            ? properties.KRAKEN_OUTPUT_DIRECTORY_BS
            : properties.KRAKEN_OUTPUT_DIRECTORY_RC
        : properties.PLAYWRIGHT_OUTPUT_DIRECTORY,
      prefix: this.isBS ? properties.PREFIX_BS : properties.PREFIX,
    };
  }
}

module.exports = Screenshots;
