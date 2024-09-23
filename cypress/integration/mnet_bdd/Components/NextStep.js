class NextStep {

    navigateToNextPage(dataTable) {
        const buttonText = dataTable.rawTable[1][0];
        cy.contains('button', buttonText).click({ force: true });
    }
}

export default NextStep;
