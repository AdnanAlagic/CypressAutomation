class TariffPage {

  locators = {
    basketModalPopupCloseButton: ".guided-tour-close-button",
    tarifOptionenColumn: '.tariff-option-column',
    tarifDuration0Months: 'label[for="uniqueRadio0idMNET_Internet_50_Regio_IP"]',
    tarifDuration24Months: 'label[for="uniqueRadio24idMNET_Internet-Tel_100_DT_VDSL"]',
    swiperSlide: '.swiper-slide',
    optionTitle: '.option-title'
  };


  closeBasketPopup() {
    cy.wait(100).then(() => {
      cy.get(this.locators.basketModalPopupCloseButton).click({ force: true });
    });
  }

  chooseTariff(data) {
    const [duration, speed, buttonText] = data.rawTable[1];

    cy.get(this.locators.tarifOptionenColumn).each(($tariff) => {
      const speedText = $tariff.find('.speed').text().trim();

      if (parseInt(speedText) === speed) {
        const $button = $tariff.find('button').filter((_, el) => {
          return Cypress.$(el).text().trim() === buttonText;
        });

        const $buttonToClick = $targetButton.length
          ? $targetButton
          : $tariff.find('button:contains("ausgewählt")');

        cy.wrap($buttonToClick).click();
      }
    });
  }

  chooseTariffDuration(data) {
    const duration = data.rawTable[1][0];

    if (duration === '0') {
      cy.get(this.locators.tarifDuration0Months).click();
    } else {
      cy.get(this.locators.tarifDuration24Months).click();
    }
  }

  choosePhoneOption(data) {
    const title = data.rawTable[1][0];

    cy.get(this.locators.swiperSlide).each(($slide) => {
      const titleText = $slide.find(this.locators.optionTitle).text().trim();

      if (titleText === title) {
        const $buttonSelect = $slide.find('button').filter((_, el) => Cypress.$(el).text().includes('auswählen'));
        const $buttonSelected = $slide.find('button').filter((_, el) => Cypress.$(el).text().includes('ausgewählt'));

        const $buttonToClick = $buttonSelect.length
          ? $buttonSelect
          : $buttonSelected.length
            ? $buttonSelected
            : null;

        if ($buttonToClick) {
          cy.wrap($buttonToClick).click();
        }
      }
    });
  }

  checkRouterOptions(data) {
    data.hashes().forEach(({ title, description1, description2, description3, description4, price, oneTime, recommendationText, button }) => {
      cy.get(this.locators.swiperSlide)
        .filter((index, element) => Cypress.$(element).find(this.locators.optionTitle).text().trim() === title)
        .within(() => {
          cy.get('.option-content--wrapper').within(() => {
            cy.checkDescriptions([description1, description2, description3, description4]);
            cy.checkPriceText('.price', price);
            cy.checkPriceText('.delivery-price', oneTime);

            cy.get('button').should('contain.text', button);
          });
        });
    });
  }

  checkPhoneOptions(dataTable) {
    dataTable.hashes().forEach(({ title, text, price, button }) => {
      cy.get(this.locators.swiperSlide)
        .filter((index, element) => Cypress.$(element).find(this.locators.optionTitle).text().trim() === title)
        .within(() => {
          cy.checkText('.description', text);
          cy.checkPriceText('.price', price);
          cy.get('button').should('contain.text', button);
        });
    });
  }
}

export default TariffPage;
