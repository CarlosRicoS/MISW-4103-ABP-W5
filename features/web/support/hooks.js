const { After, Before, AfterStep, BeforeStep } = require("@cucumber/cucumber");
const { WebClient } = require("kraken-node");
const Login = require("../../../page-objects/login.model");
const NavBar = require("../../../page-objects/nav-bar.model");
const Members = require("../../../page-objects/members.model");
const Posts = require("../../../page-objects/posts.model");
const Pages = require("../../../page-objects/pages.model");
const Screenshots = require("../../../page-objects/shared.model");


Before(async function (scenario) {
  this.deviceClient = new WebClient("chrome", {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.login = new Login(this.driver, undefined, this.version);
  this.navBar = new NavBar(this.driver, undefined, this.version);
  this.members = new Members(this.driver, undefined, this.version);
  this.posts = new Posts(this.driver, undefined, this.version);
  this.pages = new Pages(this.driver, undefined, this.version);
  this.screenShots = new Screenshots(this.driver, undefined, this.version);
  this.stepCounter = 1;
  this.scenarioId = scenario.pickle.name.toString().match(/^(EP-\d{0,5})/)[0];
  this.stepCount = "";
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

BeforeStep(async function () {
  this.stepCount = `step-${this.stepCounter}`;
});

AfterStep(async function () {
  await this.screenShots.pageScreenshot(this.scenarioId, this.stepCount);
  this.stepCounter++;
});
