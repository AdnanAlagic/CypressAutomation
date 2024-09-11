before(function () {
    cy.fixture("HooksTestData").then(function (data) {
        this.data = data;
    })
})
