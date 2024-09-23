Feature: 1-2 Test for G23 Regio Internet(0 MVLZ) for FTTC_VDSL_2 on the G23 address with default options

  Scenario: Fred is on the angular product configuration page and he selects the Internet Regio tariff with speed 50 Mbits(0 MVLZ) and orders it
    Given Fred is on the environment of luna angular wks1 page with channel and configurationId and geoId in url
      | channel | product | configurationId | geoId   |
      | PK      | Tarif   | SFF_SF          | 4371975 |

    When he confirms the privacy dialog
    When he close basket modal popup

    When on the tariff page he chooses tariff with speed
      | duration | speed | buttonText |
      | 0        | 50    | auswählen  |

    When choose tariff term
      | duration |
      | 0        |

    When on the tariff page he chooses phone option with title
      | title                 |
      | Kein Telefonanschluss |

    When Open the basket

    When Evaluate basket

    When Close active basket

    When on the tariff page he sees the router option section with following content:
      | title             | description1                                                         | description2                                                               | description3                                          | description4        | price  | oneTime                         | recommendationText | button     |
      | FRITZ!Box 7530 AX | Für WLAN in kleinen bis mittelgroßen Wohnungen in kleineren Gebäuden | Wi-Fi 6 - der neue Standard für Ihr Zuhause oder Büro                      | WLAN bis 2,4 Gbit/s                                   |                     | 3,00 € | Einmalige Versandkosten: 9,90 € |                    | ausgewählt |
      | FRITZ!Box 7590 AX | Für schnelleres WLAN in größeren Wohnungen                           | Gut geeignet für Einfamilienhäuser mit mehreren Etagen mit FRITZ!Repeatern | Wi-Fi 6 - der neue Standard für Ihr Zuhause oder Büro | WLAN bis 3,6 Gbit/s | 5,00 € | Einmalige Versandkosten: 9,90 € |                    | auswählen  |


    When on the tariff page he sees phone options with following content:
      | title                 | text                                                                                                          | price        | button     |
      | Kein Telefonanschluss | Ohne Telefonanschluss buchen Sie lediglich die Internet-Flat. Es ist nicht möglich ein Telefon anzuschließen. | Nur Internet | ausgewählt |
      | Telefon-Flat          | Ohne Aufpreis ins dt. Festnetz und M-net Mobilfunknetz telefonieren                                           | 3,00 €       | auswählen  |
      | Allnet-Flat           | Mit der Allnet-Flat jetzt in alle deutschen Fest- und Mobilfunknetze telefonieren                             | 7,00 €       | auswählen  |

    When he navigates to next page with button text
      | buttonText         |
      | Weiter zu Optionen |

    When he navigates to next page with button text
      | buttonText             |
      | Weiter zu meinen Daten |

    When Select customer type
      | type            |
      | privateCustomer |

    When on the customer page he fills address addon
      | addressAddon | previousTenant |
      | 1.OG         | VormieterTest  |

    When on the customer data page he fills in the form with his personal data
      | firstname | lastname | day | month | year | telephone | email                     |
      | TEST      | TEST     | 01  | 01    | 2000 | 0123456   | onlineshop-sit01@m-net.de |

    When he navigates to next page with button text
      | buttonText               |
      | Weiter zu Anschlussdaten |

    When he navigates to next page with button text
      | buttonText              |
      | Weiter zu Zahlungsdaten |

    When on the payment page he gives his bank info and check if it is valid
      | iban                        |
      | DE47 7015 0000 8989 8989 89 |