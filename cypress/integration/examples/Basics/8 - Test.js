describe('Radio buttons', () => {
    it('Radio button clicked', () => {

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get("input[type='radio']").check(['radio1']);

        cy.get("[value='radio3']").click().should('be.checked');
    })
})