describe('Practice 1', () => {
    it('Place an order', () => {

        // Test case:
        // 1. Go to page
        // 2. Type in search bar: 'Br'
        // 3. Click on item: 'Brocolli' 
        // 4. Open the cart
        // 5. Click on 'Procces to checkout'
        // 6. Click on 'Place order'

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('input.search-keyword').type('Br');
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const item = $el.find('.product-name').text();
            if(item.includes('Brocolli')) {
                cy.wrap($el).find('button').click();
            }
        })

        cy.get('.cart-icon').click();
        cy.get('.cart-preview').find('.cart-items').should('have.length',1);
        cy.get('.action-block:visible').find('button').click();
        cy.get('button').contains('Place Order').click();
    })
})