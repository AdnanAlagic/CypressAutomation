const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // govorimo gdje se nalaze nasi test file-ovi
    specPattern: 'cypress/integration/examples/*.js'
  },
});
