import { Given, When, Then } from "@cypress-cucumber/cypress-cucumber-preprocessor/steps";

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env("url") + "/angularpractice/shop/");
})

When('I add items to cart', () => {
    this.data.product.forEach((element) => {
        cy.selectProduct(element);
    });
})

Then('Select the country, submit and verify Thankyou', () => {
    cy.get(".btn-success").click();
    cy.get("#country").type("India");
        cy.get(".suggestions > ul > li > a").click();
        cy.get("#checkbox2").check({force:true});
        cy.get("input[type='submit']").click();

        cy.get(".alert").then((data) => {
            const text = data.text();
            expect(text).includes("Success! Thank ou! Your order will be delivered in next few weeks :-).");
        })
})