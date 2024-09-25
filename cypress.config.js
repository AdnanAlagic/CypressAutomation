const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { allureCypress } = require("allure-cypress/reporter");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  allureCypress(on, config);

  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  chromeWebSecurity: false,
  video: true,
  projectId: "esgdvq",
  env: {
    url: "https://rahulshettyacademy.com",
    allureReuseAfterSpec: true
  },
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/mnet_bdd/**/*.feature',
  },
});
