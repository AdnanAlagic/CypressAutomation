describe('New tab handling', () => {
    it('Tab', () => {

        //When we set up this link, Cypress can only operate on this page. 
        // E.i. when we have button that opens new tab, Cypress can not operate there.
        // Insted of that, we remove target="_blank" at the runntime using jQuery

        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#opentab").invoke('removeAttr', 'target').click();


        //Cypress does not support by default cross-origin operation
        // Everything needs to be inside of function
        cy.origin("https://www.qaclickacademy.com/", () => {
            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get('.mt-50 h2').then((el) => {
                expect(el.text()).to.equal('Welcome to QAClick Academy ');
            })
        })
    })
}) 