describe('Custom commands', function () {


    before(function () {
        cy.fixture("Products").then(function (data) {
            this.data = data;
        });
    });


    it('Functions', function () {

        cy.visit("https://rahulshettyacademy.com/angularpractice/");
        cy.contains('Shop').click();

        /*cy.get("app-card-list").find("app-card").each(($el, index, $list) => {
           const nameOfItem = $el.find(".card-title").text();
           if(nameOfItem.includes("iphone X")) {
               $el.find(".btn-info").click();
           }
       })*/

        // Now I am going to make custom command, which will take productName as parameter
        // Look into /support/commands.js file
        // cy.selectProduct("Blackberry");



        //If we want to do it for array of products

        this.data.product.forEach((element) => {
            cy.selectProduct(element);
        });

    });
});