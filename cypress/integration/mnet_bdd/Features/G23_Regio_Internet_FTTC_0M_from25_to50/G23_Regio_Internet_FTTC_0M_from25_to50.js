import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"

let basketData; 

before(() => {
  cy.fixture('basketData.json').then((data) => {
    basketData = data; 
  });
});

Given('Fred is on the environment of luna angular wks1 page with channel and configurationId and geoId in url', (dataTable) => {
  cy.visitCheckoutPage(dataTable);
});

When('he confirms the privacy dialog', () => {
  cy.confirmPrivacyDialog();
});

When('Close basket', () => {
  cy.closeBasket();
});

When('on the tariff page he chooses tariff with speed', (dataTable) => {
  const speed = dataTable.rawTable[1][1];
  cy.selectOption('.swiper-slide', speed, `Tariff with speed ${speed} is already selected.`);
});

When('on the tariff page he chooses phone option with title', (dataTable) => {
  const phoneTitle = dataTable.rawTable[1][0];
  cy.selectOption('.swiper-slide', phoneTitle, `Phone option "${phoneTitle}" is already selected.`);
});


When('choose ohnelaufzeit term', () => {
  cy.get('label[for="uniqueRadio0idMNET_Internet_50_Regio_IP"]').click();

});



When('Evaluate basket', () => {
  cy.get('.header-basket').click();
  cy.get('.header-basket').click();
  cy.checkBasketItem(0, basketData.monthly.monthlyTariff[0].title, basketData.monthly.monthlyTariff[0].price);
  cy.checkBasketItem(1, basketData.monthly.monthlyTariff[1].title, basketData.monthly.monthlyTariff[1].price);
  cy.checkBasketItem(2, basketData.monthly.monthlyExtras[0].title, basketData.monthly.monthlyExtras[0].price);
  cy.checkSubtotalItem(0, basketData.monthly.monthlyTariff[2].title, basketData.monthly.monthlyTariff[2].price);
  cy.checkSubtotalItem(1, basketData.monthly.monthlyExtras[1].title, basketData.monthly.monthlyExtras[1].price);
  cy.checkBoldSummaryItem(basketData.monthly.monthlyTotal[0].title, basketData.monthly.monthlyTotal[0].price);
});

When('Close active basket', () => {
  cy.get('.close-btn:visible').click();
})

When('on the tariff page he sees the router option section with following content:', (dataTable) => {
  dataTable.hashes().forEach(({ title, description1, description2, description3, description4, price, oneTime, recommendationText, button }) => {
    cy.get('.swiper-slide')
      .filter((index, element) => Cypress.$(element).find('.option-title').text().trim() === title)
      .within(() => {
        cy.get('.option-content--wrapper').within(() => {
          cy.checkDescriptions([description1, description2, description3, description4]);
          cy.checkPriceText('.price', price);
          cy.checkPriceText('.delivery-price', oneTime);

          cy.get('button').should('contain.text', button);
        });
      });
  });
});

When('on the tariff page he sees phone options with following content:', (dataTable) => {
  dataTable.hashes().forEach(({ title, text, price, button }) => {
    cy.get('swiper-slide')
      .filter((index, element) => Cypress.$(element).find('.option-title').text().trim() === title)
      .within(() => {
        cy.checkText('.description', text);
        cy.checkPriceText('.price', price);
        cy.get('button').should('contain.text', button);
      });
  });
});

When('he navigates to next page with button text', (dataTable) => {
  const buttonText = dataTable.rawTable[1][0];
  cy.clickButtonByText(buttonText);
});

When('he is on Customer data page', () => {
  cy.get('legend.ng-tns-c179-7').contains('Ihre Kundendaten');
})

When('Select customer type', (dataTable) => {
  const type = dataTable.rawTable[1][0];
  cy.selectCustomerType(type);
});

When('on the customer page he fills address addon', (dataTable) => {
  const [addressAddon, previousTenant] = dataTable.rawTable[1];
  cy.fillAddressAddon(addressAddon, previousTenant);
});

When('on the customer data page he fills in the form with his personal data', (dataTable) => {
  const [firstname, lastname, day, month, year, telephone, email] = dataTable.rawTable[1];
  cy.fillPersonalDataForm(firstname, lastname, day, month, year, telephone, email);
});

When('on the payment page he gives his bank info and check if it is valid', (dataTable) => {
  const iban = dataTable.rawTable[1][0];
  cy.get('#salesOrder_billingAccount_iban').type(iban);
});