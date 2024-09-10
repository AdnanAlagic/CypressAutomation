class HomePage {

    getEditBox() {
        return  cy.get(".ng-invalid").find(".form-group").eq(0).find(".form-control");
    }

    getGender() {
        return  cy.get("#exampleFormControlSelect1");
    }

    getCheckboxQuestion() {
        return  cy.get("#exampleCheck1");
    }

    getThirdEntpreneuer() {
        return cy.get("input[value='option3'");
    }

    getShopTag() {
        return cy.contains('Shop');
    }
} 
export default HomePage;