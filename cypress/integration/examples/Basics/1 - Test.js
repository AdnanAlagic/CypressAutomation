describe('My first test', function () {
    it('Add to cart product Carrot', function () {

        //Go to page
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

        //Set name 
        cy.get(".search-keyword").type("ca");

        //Wait a bit because of image loading and so on..
        cy.wait(2000);

        //Checking if results number of elements is 4 (visible elements)
        cy.get(".product:visible").should('have.length', 4);

        //How to get child element of this parent element
        cy.get(".products").find('.product').should('have.length', 4);

        //Click on "Add to cart";  |   eq-return element with index x  | contains-return element that contains this text
        cy.get(".products").find('.product').eq(2).contains("ADD TO CART").click();

        //Iterate over array and click on add to cart on element that has in name 'Carrot'
        cy.get(".products").find('.product').each(($el, index, $list) => {
            const nameOfItem = $el.find('.product-name').text();
            if (nameOfItem.includes('Carrot')) {
                //  $el.find("button").click();  since click on this element (promise is depricated), use cy.wrap
                cy.wrap($el).find("button").click();
            }
        })
    })
})