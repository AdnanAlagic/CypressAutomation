describe('Dropdowns', () => {

    it('Dropdowns test case - static', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // Selecting by providing value of item (by type)
        cy.get("select").select('option1').should('have.value', 'option1');

        //By element id
        cy.get("#dropdown-class-example").select('option2').should('have.value', 'option2');

    })


    it('Dropdowns test case - dynmamic', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#autocomplete").type('Ind');
        cy.get("#ui-id-1").find(".ui-menu-item").each(($el, index, $list) => {
            if ($el.text() === 'India') {
                $el.click();
            }
        })

        cy.get("#autocomplete").should('have.value', 'India');
    })
})