describe('Dates', () => {
    it('Date checking', () => {

        const monthNumber = "6";
        const date = "15";
        const year = "2027";

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        cy.get(".react-date-picker__inputGroup").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.get(".react-calendar__navigation__label").click();

        cy.contains("button", year).click();

        //const s = cy.get(".react-calendar__year-view__months").find("button").then((element) => {
        //     element.eq(monthNumber-1).click();
        // })

        cy.get(".react-calendar__year-view__months").find("button").eq(Number(monthNumber) - 1).click();
        cy.get(".react-calendar__month-view__days").find("button").eq(date).click();

        // Assertion

        cy.get(".react-date-picker__inputGroup").find("input").should("have.value", "2027-06-15");
    })
})