const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //We are able to override default settings
  defaultCommandTimeout: 5000,

  env: {
    url : "https://rahulshettyacademy.com"
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // where are the testing files stored
    specPattern: 'cypress/integration/examples/**/*.js'
  },
});
