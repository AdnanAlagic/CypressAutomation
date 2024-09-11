Feature: End to End test of validation

    Aplication regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to cart
    Then Select the country, submit and verify Thankyou