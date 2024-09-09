describe('Test three', () => {

    it('Anotations/Logs', () => {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

        // In file "1 - Test one" we are calling cy.get('.products) so many times, insted of that, we can use refrece calling using 'as'
        // This way, we only once get value, and then we just use it by reference
        cy.get('.products').as('productsLocator');
        cy.get('@productsLocator');

        //Assertion checking
        cy.get('.brand').should('have.text','GREENKART');



        //Console logging (II ways)

        // I way - using console.log() - since it is js functionv(async), and not a cypress one, because of that we have to take care of promise 
        // This way, we can't assume when this will be called, it could be at any point of execution
        console.log('Log');

        //So we can use then(), to know to take care of it
        //Now, we will first get that locator brand, and then do console log
        cy.get('.brand').then(() => {
            console.log('Log');
        })

        // II way - using cypress function cy.log(), which is synchrons
        cy.log('Log');
    })
})