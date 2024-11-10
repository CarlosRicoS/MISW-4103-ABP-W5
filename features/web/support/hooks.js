const { After, Before } = require("@cucumber/cucumber");
const { WebClient } = require("kraken-node");
const Login = require("../../../page-objects/login.model");
const NavBar = require("../../../page-objects/nav-bar.model");
const Members = require("../../../page-objects/members.model");
const Posts = require("../../../page-objects/posts.model");
Before(async function () {
  this.deviceClient = new WebClient("chrome", {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  this.login = new Login(this.driver);
  this.navBar = new NavBar(this.driver);
  this.members = new Members(this.driver);
  this.posts = new Posts(this.driver)
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
