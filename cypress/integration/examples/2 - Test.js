describe('My second test', function () {
    it('Promises', function () {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

        //If we run this code, it would say brand is not defined, since Cypress is async. It has build in mechanism that run the commands in sync order, but only and only if we use cypress comands. 
        //Text() is jquery command, so that mechanism doesn't cover that case. In that case we need to take care of promises, and set then(), which will tell the cypress to wait previous execution and then do the next one.
       
        const brandElement = cy.get('.brand');
        //cy.log(brand.text());


        // In this case we are taking care of promises manually, and this works now.
        cy.get('.brand').then((element) => {
            cy.log(element.text());
        })
    })
})