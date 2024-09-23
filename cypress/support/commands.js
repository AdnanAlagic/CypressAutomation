Cypress.Commands.add('checkDescriptions', (descriptions) => {
    descriptions.forEach(description => {
        if (description) cy.get('ul').should('contain.text', description);
    });
});

Cypress.Commands.add('checkPriceText', (selector, expectedPrice) => {
    cy.get(selector).invoke('text').then(text => {
        expect(text.replace(/\s+/g, ' ').trim()).to.includes(expectedPrice.replace(/\s+/g, ' ').trim());
    });
});

Cypress.Commands.add('checkText', (selector, expectedText) => {
    cy.get(selector).should('contain.text', expectedText);
});