// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// This file is predifined by Cypress and meant for adding custom commands. We are able to add another one with additional conf

Cypress.Commands.add('selectProduct', (productName) => {
    cy.get("app-card-list").find("app-card").each(($el, index, $list) => {
        const nameOfItem = $el.find(".card-title").text();
        if (nameOfItem.includes(productName)) {
            $el.find(".btn-info").click();
        }
    })
})


