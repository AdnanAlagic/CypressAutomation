class KundendatenPage {

    locators = {
        newCustomerField: 'input#salesOrder_newCustomer_true',
        privateCustomerField: 'input#salesOrder_privateUse_true',
        businessCustomerField: 'input#salesOrder_privateUse_false',
        adressField: '#salesOrder_serviceAddress_addressAddon',
        previousTenantField: '#salesOrder_previousTenant',
        customerFirstName: '#salesOrder_legalAddress_firstName',
        customerLastName: '#salesOrder_legalAddress_lastName',
        customerDayOfBirth: '#birthdayDay',
        customerMonthOfBirth: '#birthdayMonth',
        customerYearOfBirth: '#birthdayYear',
        customerPhoneNumber: '#salesOrder_legalAddress_phoneNumber',
        customerEmail: '#salesOrder_legalAddress_email'
    };

    selectCustomerType(dataTable) {
        const type = dataTable.rawTable[1][0];
        cy.get(this.locators.newCustomerField).click();

        if (type === 'privateCustomer') {
            cy.get(this.locators.privateCustomerField).click();
        } else {
            cy.get(this.locators.businessCustomerField).click();
        }
    }

    fillAddressAddon(dataTable) {
        const [addressAddon, previousTenant] = dataTable.rawTable[1];
        cy.get(this.locators.adressField).type(addressAddon);
        cy.get(this.locators.previousTenantField).type(previousTenant);
    }

    fillPersonalDataForm(dataTable) {
        const [firstname, lastname, day, month, year, telephone, email] = dataTable.rawTable[1];
        cy.get(this.locators.customerFirstName).type(firstname);
        cy.get(this.locators.customerLastName).type(lastname);
        cy.get(this.locators.customerDayOfBirth).type(day);
        cy.get(this.locators.customerMonthOfBirth).type(month);
        cy.get(this.locators.customerYearOfBirth).type(year);
        cy.get(this.locators.customerPhoneNumber).type(telephone);
        cy.get(this.locators.customerEmail).type(email);
    }
}

export default KundendatenPage;
