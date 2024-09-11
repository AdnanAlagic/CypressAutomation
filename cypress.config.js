const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // Add Cucumber plugin
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Configure browserify preprocessor
  on("file:preprocessor", browserify.default(config));

  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  projectId: "esgdvq",

  env: {
    url: "https://rahulshettyacademy.com",
  },

  e2e: {
    setupNodeEvents,
    // Point to .feature files for BDD
    specPattern: 'cypress/integration/examples/BDD/*.feature',
  },
});
