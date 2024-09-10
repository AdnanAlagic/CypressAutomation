const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //We are able to override default settings
  defaultCommandTimeout: 5000,
  reporter: 'cypress-mochawesome-reporter',
  video: true,

  env: {
    url : "https://rahulshettyacademy.com"
  },

  e2e: {
    setupNodeEvents(on, config) {
      // For reporter, we need to configure listener
      require('cypress-mochawesome-reporter/plugin')(on);


    },
    // where are the testing files stored
    specPattern: 'cypress/integration/examples/**/*.js'
  },
});
