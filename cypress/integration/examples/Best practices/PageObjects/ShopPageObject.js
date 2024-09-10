class ShopPage {

    getAllProducts() {
        cy.get("app-card-list").find("app-card");
    }
}
export default ShopPage;