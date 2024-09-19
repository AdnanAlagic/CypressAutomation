import { normalizeText } from './utils';

Cypress.Commands.add('visitCheckoutPage', (dataTable) => {
    const [channel, product, configurationId, geoId] = dataTable.rawTable[1];
    const baseUrl = 'https://shop.m-net.de';
    const isInternetOnly = 'true';

    const url = `${baseUrl}/checkout/${product}?Channel=${channel}&ConfigurationID=${configurationId}&GeoID=${geoId}&isInternetOnly=${isInternetOnly}`;
    cy.visit(url);
});


Cypress.Commands.add('confirmPrivacyDialog', () => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Cannot read properties of undefined (reading \'Consent\')')) {
            return false;
        }
        return true;
    });

    cy.wait(7000).then(() => {
        cy.wrap(window.top.document.querySelector("#popin_tc_privacy_button")).click({ force: true });
    });
});


Cypress.Commands.add('closeBasket', () => {
    cy.wait(1000).then(() => {
        cy.get(".guided-tour-close-button").click({ force: true });
    });
});

Cypress.Commands.add('selectOption', (selector, textCondition, logMessage) => {
    cy.get(selector)
        .filter((index, element) => {
            const text = Cypress.$(element).text().trim().replace(/\u00a0/g, ' ');
            return text.includes(textCondition);
        })
        .within(() => {
            cy.get('button')
                .then($button => {
                    const buttonText = $button.text().trim().replace(/\u00a0/g, ' ');
                    if (buttonText === 'auswählen') {
                        cy.wrap($button).click({ force: true });
                    } else if (buttonText === 'ausgewählt') {
                        cy.log(logMessage);
                    }
                });
        });
});

Cypress.Commands.add('checkDescriptions', (descriptions) => {
    descriptions.forEach(description => {
        if (description) cy.get('ul').should('contain.text', description);
    });
});

Cypress.Commands.add('checkPriceText', (selector, expectedPrice) => {
    cy.get(selector).invoke('text').then(text => {
        expect(text.replace(/\s+/g, ' ').trim()).to.includes(expectedPrice.replace(/\s+/g, ' ').trim());
    });
});

Cypress.Commands.add('checkText', (selector, expectedText) => {
    cy.get(selector).should('contain.text', expectedText);
});

Cypress.Commands.add('clickButtonByText', (buttonText) => {
    cy.contains('button', buttonText).click();
});

Cypress.Commands.add('selectCustomerType', (type) => {
    cy.get('input#salesOrder_newCustomer_true').click();

    if (type === 'privateCustomer') {
        cy.get('input#salesOrder_privateUse_true').click();
    } else {
        cy.get('input#salesOrder_privateUse_false').click();
    }
});

Cypress.Commands.add('fillAddressAddon', (addressAddon, previousTenant) => {
    cy.get('#salesOrder_serviceAddress_addressAddon').type(addressAddon);
    cy.get('#salesOrder_previousTenant').type(previousTenant);
});

Cypress.Commands.add('fillPersonalDataForm', (firstname, lastname, day, month, year, telephone, email) => {
    cy.get('#salesOrder_legalAddress_firstName').type(firstname);
    cy.get('#salesOrder_legalAddress_lastName').type(lastname);
    cy.get('#birthdayDay').type(day);
    cy.get('#birthdayMonth').type(month);
    cy.get('#birthdayYear').type(year);
    cy.get('#salesOrder_legalAddress_phoneNumber').type(telephone);
    cy.get('#salesOrder_legalAddress_email').type(email);
});

Cypress.Commands.add('enterBankInfo', (iban) => {
    cy.get('#salesOrder_billingAccount_iban').type(iban);
});

Cypress.Commands.add('checkBasketItem', (index, title, price) => {
    cy.get('app-monthly-price .summary-item.row')
        .eq(index)
        .within(() => {
            cy.get('.col-xs-8').first().invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(title);
            });
            cy.get('.col-xs-4').invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(price);
            });
        });
});

Cypress.Commands.add('checkSubtotalItem', (index, title, price) => {
    cy.get('app-monthly-price .summary-subtotal.row')
        .eq(index)
        .within(() => {
            cy.get('.subtotal').invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(title);
            });
            cy.get('.subtotal-price.text-right').invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(price);
            });
        });
});

Cypress.Commands.add('checkBoldSummaryItem', (title, price) => {
    cy.get('app-monthly-price .summary-item-bold.row')
        .within(() => {
            cy.get('.col-xs-8').first().invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(title);
            });
            cy.get('.col-xs-4.text-right.summary-total').invoke('text').then((text) => {
                expect(normalizeText(text)).to.eq(price);
            });
        });
});