import HomePage from "./HomePageObject";
import ShopPage from "./ShopPageObject"

before(function () {
    cy.fixture("HooksTestData").then(function (data) {
        this.data = data;
    })
})

describe("Test page objects", function () {
    
    it("Home page object", function () {

        cy.visit("https://rahulshettyacademy.com/angularpractice/");

        //Creating object for HomePage object
        const homepage = new HomePage();

        homepage.getEditBox().type(this.data.name);
        homepage.getGender().select(this.data.gender);
        homepage.getCheckboxQuestion().should("not.be.checked");
        homepage.getThirdEntpreneuer().should("be.disabled");
        homepage.getShopTag().click();
    })
})