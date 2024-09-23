class RedirectPage {

  locators = {
    acceptPrivacyPolicyButton: "#popin_tc_privacy_button",
  };

  visitCheckoutPage(data) {
    const [channel, product, configurationId, geoId] = data.rawTable[1];
    const baseUrl = 'https://shop.m-net.de';
    const isInternetOnly = 'true';
    const url = `${baseUrl}/checkout/${product}?Channel=${channel}&ConfigurationID=${configurationId}&GeoID=${geoId}&isInternetOnly=${isInternetOnly}`;
    cy.visit(url);
  }

  confirmPrivacyDialog() {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Cannot read properties of undefined (reading \'Consent\')')) {
        return false;
      }
      return true;
    });

    cy.wait(7000).then(() => {
      const button = window.top.document.querySelector(this.locators.acceptPrivacyPolicyButton);
      if (button) {
        cy.wrap(button).click({ force: true });
      }
    });
  }
}

export default RedirectPage;
