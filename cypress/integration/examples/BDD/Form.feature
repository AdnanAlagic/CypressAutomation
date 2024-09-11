Feature: Form input

    Aplication regression

    @Regression
    Scenario: Filling the form
    Given I open landing page
    When I fill the form details
    |name | gender |
    |John |Female |
    Then Valide form details