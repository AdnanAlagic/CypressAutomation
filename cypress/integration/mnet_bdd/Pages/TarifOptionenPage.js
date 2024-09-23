class TarifOptionenPage {

    locators = {
        pageHeaderTitle: 'legend.ng-tns-c179-7'
    };

    checkCustomerDataPage() {
        cy.get(this.locators.pageHeaderTitle).contains('Ihre Kundendaten');
    }
}

export default TarifOptionenPage;
