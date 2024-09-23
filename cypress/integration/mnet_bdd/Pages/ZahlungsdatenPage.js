class ZahlungsdatenPage {

    locators = {
        ibanInputField: '#salesOrder_billingAccount_iban'
    };

    enterBankInfo(dataTable) {
        const iban = dataTable.rawTable[1][0];
        cy.get(this.locators.ibanInputField).type(iban);
    }
}

export default ZahlungsdatenPage;
