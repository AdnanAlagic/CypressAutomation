const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // where are the testing files stored
    specPattern: 'cypress/integration/examples/*/*.js'
  },
});
