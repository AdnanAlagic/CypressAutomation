describe('Hooks', function () { 

    // https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks

    before(() => {
        // root-level hook
        // runs once before all tests
      })
      
      beforeEach(() => {
        // root-level hook
        // runs before every test block
      })
      
      afterEach(() => {
        // runs after each test block
      })
      
      after(() => {
        // runs once all tests are done
      })
      

    before(function () { 
        cy.fixture("HooksTestData").then(function (data) {
            this.data = data; 
        });
    });



    it('Date checking', function () { 
        cy.visit("https://rahulshettyacademy.com/angularpractice/");
        cy.get(".ng-invalid").find(".form-group").eq(0).find(".form-control").type(this.data.name); // Access 'this.data'
        cy.get("#exampleCheck1").check();
        cy.get("#exampleFormControlSelect1").select(this.data.gender);
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name);
        cy.get(".ng-invalid").find(".form-group").eq(0).find(".form-control").should('have.attr','minlength','2');
        cy.get("input[value='option3'").should("be.disabled");


    });
});