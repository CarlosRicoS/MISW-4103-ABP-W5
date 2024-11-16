const exp = require("node:constants");
exports.testIds = {
  scenarioId: undefined,
  stepCounter: undefined,
};

exports.screenshotHandler = async (screenshots, params) => {
  await screenshots.pageScreenshot(params.scenarioId, params.stepCounter);
  params.stepCounter++;
};

exports.pixelmatchHandler = async (pixelmatch, params) => {
  let stepInfo = {
    'scenario': params.scenarioId,
    'step': params.stepCounter - 1,
    'result': undefined
  };
  stepInfo.result = await pixelmatch.compareImages(params.scenarioId, params.stepCounter - 1);
  return stepInfo;
};

exports.reportPixelmatchHandler = async (pixelmatch, params) => {
  await pixelmatch.generateReport(params);
}