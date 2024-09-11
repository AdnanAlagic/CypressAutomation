import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../Best practices/PageObjects/HomePageObject';

const HomePage = new HomePage();


Given('I open landing page', () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
})

When('I fill the form details', function(dataTable) {
    cy.get(".ng-invalid").find(".form-group").eq(0).find(".form-control").type(dataTable.rawTable[1][0]);
    cy.get("#exampleFormControlSelect1").select(dataTable.rawTable[1][1]);
})

Then('Valide form details', () => {
    cy.get("#exampleCheck1").should("not.be.checked");
    cy.get("input[value='option3'").should("be.disabled");
})
