import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor"
import RedirectPage from "../../Pages/RedirectPage";
import TariffPage from "../../Pages/MeinTarifPage";
import Basket from "../../Components/Basket";
import NextStep from "../../Components/NextStep";
import TarifOptionenPage from "../../Pages/TarifOptionenPage";
import KundendatenPage from "../../Pages/KundendatenPage";
import ZahlungsdatenPage from "../../Pages/ZahlungsdatenPage";

const tariffPage = new TariffPage();
const redirectPage = new RedirectPage();
const basket = new Basket();
const nextStep = new NextStep();
const tarifOptionenPage = new TarifOptionenPage();
const kundendatenPage = new KundendatenPage();
const zahlungsdatenPage = new ZahlungsdatenPage();


before(function () {
  cy.fixture("basketData").then(function (data) {
    this.data = data;
  })
});

Given('Fred is on the environment of luna angular wks1 page with channel and configurationId and geoId in url', function (dataTable) {
  redirectPage.visitCheckoutPage(dataTable);
});

When('he confirms the privacy dialog', () => {
  redirectPage.confirmPrivacyDialog();
});

When('he close basket modal popup', () => {
  tariffPage.closeBasketPopup();
});

When('on the tariff page he chooses tariff with speed', (dataTable) => {
  tariffPage.chooseTariff(dataTable);
});

When('on the tariff page he chooses phone option with title', (dataTable) => {
  tariffPage.choosePhoneOption(dataTable);
});

When('choose tariff term', (dataTable) => {
  tariffPage.chooseTariffDuration(dataTable);
});

When('Open the basket', () => {
  basket.openBasket();
})

When('Evaluate basket', function () {
  basket.openBasket();
  basket.checkBasketItem(0, this.data.monthly.monthlyTariff[0].title, this.data.monthly.monthlyTariff[0].price);
  basket.checkBasketItem(1, this.data.monthly.monthlyTariff[1].title, this.data.monthly.monthlyTariff[1].price);
  basket.checkBasketItem(2, this.data.monthly.monthlyExtras[0].title, this.data.monthly.monthlyExtras[0].price);
  basket.checkSubtotalItem(0, this.data.monthly.monthlyTariff[2].title, this.data.monthly.monthlyTariff[2].price);
  basket.checkSubtotalItem(1, this.data.monthly.monthlyExtras[1].title, this.data.monthly.monthlyExtras[1].price);
  basket.checkBoldSummaryItem(this.data.monthly.monthlyTotal[0].title, this.data.monthly.monthlyTotal[0].price);
});

When('Close active basket', () => {
  basket.closeBasket();
})

When('on the tariff page he sees the router option section with following content:', (dataTable) => {
  tariffPage.checkRouterOptions(dataTable);
});

When('on the tariff page he sees phone options with following content:', function (dataTable) {
  tariffPage.checkPhoneOptions(dataTable);
});

When('he navigates to next page with button text', (dataTable) => {
  nextStep.navigateToNextPage(dataTable);
});

When('he is on Customer data page', () => {
  tarifOptionenPage.checkCustomerDataPage();
})

When('Select customer type', (dataTable) => {
  kundendatenPage.selectCustomerType(dataTable);
});

When('on the customer page he fills address addon', (dataTable) => {
  kundendatenPage.fillAddressAddon(dataTable);
});

When('on the customer data page he fills in the form with his personal data', (dataTable) => {
  kundendatenPage.fillPersonalDataForm(dataTable);
});

When('on the payment page he gives his bank info and check if it is valid', (dataTable) => {
  zahlungsdatenPage.enterBankInfo(dataTable);
});