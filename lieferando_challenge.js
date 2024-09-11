let menus = ["Pizza Salami", "Pizza Margherita"];
let prices = [7.99, 8.99];
let amounts = [1, 3];

function getValueFromInput(inputId) {                     // Diese Funktion dient als Platzhalter
  var inputElement = document.getElementById(inputId);    // Hier wird als Beispiel gezeigt, wie man ein Element mit einer ID aus einem Inputfeld holt und als Variable weiter nutzt.
  if (inputElement) {                                     // Hier wird geschaut ob ein inputElement mit Daten gefüllt bzw. vorhanden ist. Wenn ja:
    return inputElement.value;                            // wird hier eine Variable inputElement zurückgegeben.
  } else {                                                // Falls Nein dann wird einfach NULL zurückgegeben!
    return null;
  }
}

function getMenuFromInput() {                             // Mit dieser Funktion holen wir uns den Input aus der ID menu
  var menuInput = getValueFromInput("menu");              // Deklarierung der Variablen menuInput mit den Daten aus dem Inputfeld mit der ID 'menu'
  if (menuInput !== null) {                               // Kontrolle ob im Feld auch etwas steht. Es wird mit ungleich null geprüft.
    return menuInput.trim();                              // Wenn es Daten gibt werden diese zurückgegeben und mit dem Befehl trim werden noch unnötige Leerzeichen am Ende oder Anfang entfernt.
  } else {
    return null;                                          // Falls keine Daten vorhanden sind wird einfach null zurückgegeben.
  }
}

function getPriceFromInput() {                            // Hier geschieht prinzipiell das gleiche wie in der getMenuFromInput Funktion, nur mit einem Preis.
  var priceInput = getValueFromInput("price");
  if (priceInput !== null) {
    return parseFloat(priceInput);                        // Dieser Preis wird mit parseFloat in eine Dezimalzahl gewandelt.
  } else {
    return null;
  }
}

function onAddMenu() {                                    // Mit dieser Funktion schreiben wir die Daten aus den Funktionen für Menu und Price ins array.
  var menuInput = getMenuFromInput();                     // Hier deklarieren wir die Variable für Menu mit den Daten aus der passenden Funktion.
  var priceInput = getPriceFromInput();                   // Hier selbiges für den Price.

  if (menuInput !== null && priceInput !== null) {        // Hier wird überprüft ob Daten vorhanden bzw. eingetragen wurden.
    var menuIndex = getMenuIndex(menuInput);              // Hier wird mit der Funktion getMenuIndex geprüft ob sich ein Menü bereits in der Liste befindet. menuInput ist die Variable die aus der getMenuFromInput Funktion übergeben wurde. Das ganze wird deklariert mit menuIndex, um einfacher weiter zu arbeiten.
    if (menuIndex !== -1) {                               // Hier wird gegengeprüft ob der Indexwert NICHT -1 beträgt und sich somit das Menü in der Liste befindet.
      amounts[menuIndex]++;                               // Dann wird hier an der entsprechenden Stelle der Wert um 1 erhöht.
    } else {                                              // Ansonsten wird das Menü mit Name, Preis und Menge 1 ins Array geschrieben.
      menus.push(menuInput);
      prices.push(priceInput);
      amounts.push(1);
    }
  }
}

function getMenuIndex(menu) {                             // Mit dieser Hilfsfunktion wird geprüft ob sich ein Menü schon im Array befindet.
  return menus.indexOf(menu);                             // indexOf Suchfunktion. Syntax ist so zu verstehen: indexOf(searchElement) oder auch indexOf(searchElement, startIndex) Beispiel: indexOf('Pizza Salami') oder indexOf('Pizza Salami', 2). Vorangestellt der Name des Arrays also menus.indexOf('Pizza Salami')
}
