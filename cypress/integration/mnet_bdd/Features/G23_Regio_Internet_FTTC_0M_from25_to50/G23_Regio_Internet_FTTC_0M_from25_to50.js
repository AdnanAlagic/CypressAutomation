import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"

Given('Fred is on the environment of luna angular wks1 page with channel and configurationId and geoId in url', (dataTable) => {
  const baseUrl = 'https://shop.m-net.de';  
  const product = dataTable.rawTable[1][1];  
  const channel = dataTable.rawTable[1][0];  
  const configurationId = dataTable.rawTable[1][2];  
  const geoId = dataTable.rawTable[1][3];  
  const isInternetOnly = 'true';

  if (product) {
    const url = `${baseUrl}/checkout/${product}?Channel=${channel}&ConfigurationID=${configurationId}&GeoID=${geoId}&isInternetOnly=${isInternetOnly}`;
    cy.visit(url);
  }
});


When('he confirms the privacy dialog', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Cannot read properties of undefined (reading \'Consent\')')) {
      return false;
    }
    return true;
  });

  cy.wait(6000).then(() => {
    cy.wrap(window.top.document.querySelector("#popin_tc_privacy_button")).click({ force: true });
  });
});


When('Close basket', () => {
  cy.wait(5000).then(() => {
    cy.get(".guided-tour-close-button").click({force: true});
  })
});


When('on the tariff page he chooses tariff with speed', (dataTable) => {
  const drucation = dataTable.rawTable[1][0];
  const speed = dataTable.rawTable[1][1];
  const buttonText = dataTable.rawTable[1][2];


  cy.get('.swiper-slide')
    .filter((index, element) => {
      const text = Cypress.$(element).text().trim();
      return text.includes(speed);
    })
    .within(() => {
      cy.get('button')
        .then($button => {
          const buttonText = $button.text().trim();
          if (buttonText === 'auswählen') {
            cy.wrap($button).click({ force: true });
          } else if (buttonText === 'ausgewählt') {
            cy.log(`Tariff with speed ${speed} is already selected.`);
          }
        });
    });
});


When('on the tariff page he chooses phone option with title', () => {
  cy.get('.swiper-slide')  
    .filter((index, element) => {
      const optionTitle = Cypress.$(element).find('.option-title').text().trim().replace(/\u00a0/g, ' ');  
      return optionTitle === 'Kein Telefonanschluss';  
    })
    .within(() => {
    
      cy.get('button')
        .then($button => {
          const buttonText = $button.text().trim().replace(/\u00a0/g, ' ');  
          if (buttonText === 'auswählen') {
            cy.wrap($button).click({ force: true });  
          } else if (buttonText === 'ausgewählt') {
            cy.log('Phone option "Kein Telefonanschluss" is already selected.');
          }
        });
    });
});

When('Evaluate basket', () => {

  cy.get('.header-basket').click();

  cy.get('app-monthly-price .summary-head')
  .should('contain.text', 'Monatliche Kosten');

cy.get('app-monthly-price .summary-title')
  .should('contain.text', 'Mein M-net Tarif');



  cy.get('app-monthly-price .summary-item.row').each(($element, index, $list) => {
    console.log($element.text());
  })

  cy.get('app-monthly-price .summary-item.row')
  .contains('.col-xs-8', 'Internet 50') 
  .should('exist')
  .siblings('.col-xs-4')  
  .invoke('text')        
  .then((text) => {
    const normalizedText = text.replace(/\u00a0/g, ' ').trim(); 
    expect(normalizedText).to.eq('34,90 €'); 
  });


cy.get('app-monthly-price .summary-item.row')
.eq(1)
.within(() => {
  cy.get('.col-xs-8').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Infrastruktur-Pauschale');
  });
  cy.get('.col-xs-4.text-right').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('7,00 €');
  });
});


cy.get('app-monthly-price .summary-item.row')
.eq(2)
.within(() => {
  cy.get('.col-xs-8').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Gutschrift 5 €');
  });
  cy.get('.col-xs-4.text-right.discount-price').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('-5,00 €');
  });
});


cy.get('app-monthly-price .summary-subtotal.row')
.eq(0)
.within(() => {
  cy.get('.subtotal').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Zwischensumme');
  });
  cy.get('.subtotal-price.text-right').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('31,90 €');
  });
});


cy.get('app-monthly-price .summary-title.ng-star-inserted')
.invoke('text')
.then((text) => {
  expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Endgeräte & Extras');
});


cy.get('app-monthly-price .summary-item.row')
.eq(4)
.within(() => {
  cy.get('.col-xs-8').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('FRITZ!Box 7530');
  });
  cy.get('.col-xs-4.text-right').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('inklusive');
  });
});


cy.get('app-monthly-price .summary-subtotal.row')
.eq(1)
.within(() => {
  cy.get('.subtotal').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Zwischensumme');
  });
  cy.get('.subtotal-price.text-right').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('inklusive');
  });
});


cy.get('app-monthly-price .summary-item-bold.row')
.within(() => {
  cy.get('.col-xs-8').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('Gesamt Monatlich');
  });
  cy.get('.col-xs-4.text-right.summary-total').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('31,90 €');
  });
});


cy.get('app-monthly-price .summary-item.row.padding-remove--left')
.within(() => {
  cy.get('.col-xs-4.text-right').invoke('text').then((text) => {
    expect(text.replace(/\u00a0/g, ' ').trim()).to.eq('41,90 €');
  });
});


});

When('Close active basket', () => {

  cy.get('.close-btn:visible').click();

})

When('on the tariff page he sees the router option section with following content:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    const {
      title,
      description1,
      description2,
      description3,
      description4,
      price,
      oneTime,
      recommendationText,
      button
    } = row;


    cy.get('.swiper-slide')
      .filter((index, element) => {
        const optionTitle = Cypress.$(element).find('.option-title').text().trim();
        return optionTitle === title;
      })
      .within(() => {

        cy.get('.option-content--wrapper')
          .within(() => {
            cy.get('ul').should('contain.text', description1);
            if (description2) cy.get('ul').should('contain.text', description2);
            if (description3) cy.get('ul').should('contain.text', description3);
            if (description4) cy.get('ul').should('contain.text', description4);

            cy.get('.price').invoke('text').then(priceText => {
              expect(priceText.replace(/\s+/g, ' ').trim()).to.includes(price.replace(/\s+/g, ' ').trim());
            });

            cy.get('.delivery-price').invoke('text').then(oneTimeText => {
              expect(oneTimeText.replace(/\s+/g, ' ').trim()).to.includes(oneTime.replace(/\s+/g, ' ').trim());
            });

       
            if (recommendationText) {
              cy.get('.mn-row-highlight-title').should('contain.text', recommendationText);
            }

       
            cy.get('button').should('contain.text', button);
          });
      });
  });
});

When('on the tariff page he sees phone options with following content:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    const {
      title,
      text,
      price,
      button
    } = row;

   
    cy.get('swiper-slide')
      .filter((index, element) => {
        const optionTitle = Cypress.$(element).find('.option-title').text().trim();
        return optionTitle === title;
      })
      .within(() => {
     
        cy.get('.description').should('contain.text', text);

 
        cy.get('.price').invoke('text').then(priceText => {
          expect(priceText.replace(/\s+/g, ' ').trim()).to.includes(price.replace(/\s+/g, ' ').trim());
        });


        cy.get('button').should('contain.text', button);
      });
  });
});

When('he navigates to next page with button text', (dataTable) => {
 
  const buttonText = dataTable.rawTable[1][0]; 


  cy.contains('button', buttonText).click();
});


When('he is on Customer data page', () => {
  cy.get('legend.ng-tns-c179-7').contains('Ihre Kundendaten');
})


When('Select customer type', (dataTable) => {
 
  const rows = dataTable.rawTable;
  const type = rows[1][0]; 


  cy.get('input#salesOrder_newCustomer_true').click();

  
  if (type === 'privateCustomer') {
    cy.get('input#salesOrder_privateUse_true').click(); 
  } else {
    cy.get('input#salesOrder_privateUse_false').click(); 
  }
});

When('on the customer page he fills address addon', (dataTable) => {
  
  const rows = dataTable.rawTable;
  const addressAddon = rows[1][0]; 
  const previousTenant = rows[1][1]; 

  
  cy.get('#salesOrder_serviceAddress_addressAddon').type(addressAddon);


  cy.get('#salesOrder_previousTenant').type(previousTenant);
});

When('on the customer data page he fills in the form with his personal data', (dataTable) => {
 
  const rows = dataTable.rawTable;
  const [firstname, lastname, day, month, year, telephone, email] = rows[1];

  
  cy.get('#salesOrder_legalAddress_firstName').type(firstname);
  cy.get('#salesOrder_legalAddress_lastName').type(lastname);
  cy.get('#birthdayDay').type(day);
  cy.get('#birthdayMonth').type(month);
  cy.get('#birthdayYear').type(year);
  cy.get('#salesOrder_legalAddress_phoneNumber').type(telephone);
  cy.get('#salesOrder_legalAddress_email').type(email);
});

When('on the payment page he gives his bank info and check if it is valid', (dataTable) => {

  const rows = dataTable.rawTable;
  const iban = rows[1][0];

  cy.get('#salesOrder_billingAccount_iban').type(iban);

})



