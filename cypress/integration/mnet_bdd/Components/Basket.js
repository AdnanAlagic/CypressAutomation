import { normalizeText } from "../../../support/utils";

class Basket {

    locators = {
        headerBusket: '.header-basket',
        closeBasketButton: '.close-btn:visible',
        summaryItemRow: 'app-monthly-price .summary-item.row',
        summarySubtotalRow: 'app-monthly-price .summary-subtotal.row',
        summaryItemBoldRow: 'app-monthly-price .summary-item-bold.row'
    };

    openBasket() {
        cy.get(this.locators.headerBusket).click();
    }

    closeBasket() {
        cy.get(this.locators.closeBasketButton).click();
    }

    checkBasketItem(index, title, price) {
        cy.get(this.locators.summaryItemRow)
            .eq(index)
            .within(() => {
                cy.get('.col-xs-8').first().invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(title);
                });
                cy.get('.col-xs-4').invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(price);
                });
            });
    }

    checkSubtotalItem(index, title, price) {
        cy.get(this.locators.summarySubtotalRow)
            .eq(index)
            .within(() => {
                cy.get('.subtotal').invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(title);
                });
                cy.get('.subtotal-price.text-right').invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(price);
                });
            });
    }

    checkBoldSummaryItem(title, price) {
        cy.get(this.locators.summaryItemBoldRow)
            .within(() => {
                cy.get('.col-xs-8').first().invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(title);
                });
                cy.get('.col-xs-4.text-right.summary-total').invoke('text').then((text) => {
                    expect(normalizeText(text)).to.eq(price);
                });
            });
    }
}

export default Basket;