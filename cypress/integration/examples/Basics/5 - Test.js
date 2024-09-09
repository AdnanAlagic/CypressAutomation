describe("Practice 2", () => {

    it("Checkbox", () => {

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // Assertion of checkbox. Do the checking and unchecking.
        cy.get("#checkBoxOption1").check().should('be.checked').and('have.value','option1');
        cy.get("#checkBoxOption1").uncheck().should('not.be.checked');

        // Multiple checkboxes, providing values
        cy.get("input[type='checkbox']").check(['option2','option3']);
    })
})