import HomePage from "../Best practices/PageObjects/HomePageObject"

before(function () {
    cy.fixture("Products").then(function (data) {
        this.data = data;
    })
})

describe("Practice One", function () {
    
    it("Practice", function () {

        cy.visit(Cypress.env("url") + "/angularpractice/shop/");
        
        this.data.product.forEach((element) => {
            cy.selectProduct(element);
        });

        cy.get(".nav-item.active").click();

        cy.get(".btn-success").click();


        cy.get("#country").type("India");
        cy.get(".suggestions > ul > li > a").click();
        cy.get("#checkbox2").check({force:true});
        cy.get("input[type='submit']").click();

        cy.get(".alert").then((data) => {
            const text = data.text();
            expect(text).includes("Success! Thank ou! Your order will be delivered in next few weeks :-).");
        })
    })
})