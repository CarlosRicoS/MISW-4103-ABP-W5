exports.testIds = {
  scenarioId: undefined,
  stepCounter: undefined,
};

exports.screenshotHandler = async (screenshots, params) => {
  await screenshots.pageScreenshot(params.scenarioId, params.stepCounter);
  params.stepCounter++;
};
