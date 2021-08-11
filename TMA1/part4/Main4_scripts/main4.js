
// register event handlers for buttons upon loading page
function start() {

    document.getElementById("Main3-Nav-Measurement-button").addEventListener("click", clickMeasurementButton, false);
    document.getElementById("Main3-Nav-Mortgage-button").addEventListener("click", clickMortgageButton, false);
    document.getElementById("Main3-Nav-Tax-button").addEventListener("click", clickTaxButton, false);
} // end function start

//listen for changes made by user
function pressWeightKey() {
    if (document.getElementById("inputWeight").value != "" &&
        document.getElementById("weightUnit").value != "") {
        clickSubmitWeight();
    }
}
function pressLengthKey() {
    if (document.getElementById("inputLength").value != "" &&
        document.getElementById("LengthUnit").value != "") {
        clickSubmitLength();
    }
}
function pressAreaKey() {
    if (document.getElementById("inputArea").value != "" &&
        document.getElementById("AreaUnit").value != "") {
        clickSubmitArea();
    }
}
function pressVolumeKey() {
    if (document.getElementById("inputVolume").value != "" &&
        document.getElementById("VolumeUnit").value != "") {
        clickSubmitVolume();
    }
}
function pressMortgageKey() {
    if (document.getElementById("inputMortgage").value != "" &&
        document.getElementById("inputInterest").value != "" &&
        document.getElementById("inputPeriod").value != "" &&
        document.getElementById("frequencyUnit").value != "") {
        submitMortgage();
    }
}
function pressTaxKey() {
    if (document.getElementById("inputTax").value != "" &&
        document.getElementById("inputProvince").value != "") {
        submitTax();
    }
}

//update tool being selected
function clickMeasurementButton() {
    var contentUrl = "./Main4_html_files/Main4_html_measure.html";
    setContent(contentUrl);
    document.addEventListener('keyup', pressWeightKey);
    document.addEventListener('keyup', pressLengthKey);
    document.addEventListener('keyup', pressAreaKey);
    document.addEventListener('keyup', pressVolumeKey);
}
function clickMortgageButton() {
    var contentUrl = "./Main4_html_files/Main4_html_mortgage.html";
    setContent(contentUrl);
    document.addEventListener('keyup', pressMortgageKey);
}
function clickTaxButton() {
    var contentUrl = "./Main4_html_files/Main4_html_tax.html";
    setContent(contentUrl);
    document.addEventListener('keyup', pressTaxKey);
}

//update result functions
function submitMortgage() {
    var mortgageValue = parseFloat(document.getElementById("inputMortgage").value);
    var interestValue = parseFloat(document.getElementById("inputInterest").value);
    var periodValue = parseFloat(document.getElementById("inputPeriod").value);
    var frequencyUnit = document.getElementById("frequencyUnit").value;

    var numPayments = 0;
    var effectiveInterest = 0;
    if (frequencyUnit == "monthly") {
        numPayments = 12 * periodValue;
        effectiveInterest = (interestValue / 100) / 12;
    }
    else if (frequencyUnit == "yearly") {
        numPayments = periodValue;
        effectiveInterest = interestValue / 100;
    }
    else {
        numPayments = 24 * periodValue;
        effectiveInterest = (interestValue / 100) / 24;
    }

    var capRecovery = (effectiveInterest * ((1 + effectiveInterest) ** numPayments)) / (((1 + effectiveInterest) ** numPayments) - 1);
    var totalCost = mortgageValue + (numPayments * capRecovery * mortgageValue - mortgageValue)
    results = "<p>Payment per " + frequencyUnit + " period ($): " + (capRecovery * mortgageValue).toFixed(3) + "</p>" +
        "<p>Total number of " + frequencyUnit + " payments: " + numPayments + "</p>" +
        "<p>Total interest payed ($): " + (numPayments * capRecovery * mortgageValue - mortgageValue).toFixed(3) + "</p>" +
        "<p>Total principal payed ($): " + mortgageValue + "</p>" +
        "<p>Total ammount payed ($): " + totalCost.toFixed(3) + "</p>"

    updateResults("mortgageResults", results);
}
function submitTax() {
    var price = parseFloat(document.getElementById("inputTax").value);
    var tax = parseFloat(document.getElementById("inputProvince").value);

    results = "<p>Original price: " + price + "$</p>" +
        "<p>Additional tax payed: " + price * tax + "$</p>" +
        "<p>Total ammount payed: " + ((price * tax) + price) + "$</p>";
    updateResults("taxResults", results);
}
function clickSubmitWeight() {
    var value = document.getElementById("inputWeight").value;
    var unitValue = document.getElementById("weightUnit").value;
    var results = "kg: " + conversionCalculator("weight", value, unitValue, "kg") + "&nbsp;&nbsp;&nbsp;" +
        "g: " + conversionCalculator("weight", value, unitValue, "g") + "&nbsp;&nbsp;&nbsp;" +
        "mg: " + conversionCalculator("weight", value, unitValue, "mg") + "&nbsp;&nbsp;&nbsp;" +
        "tonne: " + conversionCalculator("weight", value, unitValue, "tonne") + "&nbsp;&nbsp;&nbsp;" +
        "lb: " + conversionCalculator("weight", value, unitValue, "lb") + "&nbsp;&nbsp;&nbsp;" +
        "oz: " + conversionCalculator("weight", value, unitValue, "oz");
    updateResults("weightResults", results);
}

function clickSubmitLength() {
    var value = document.getElementById("inputLength").value;
    var unitValue = document.getElementById("LengthUnit").value;
    var results = "km: " + conversionCalculator("length", value, unitValue, "km") + "&nbsp;&nbsp;&nbsp;" +
        "m: " + conversionCalculator("length", value, unitValue, "m") + "&nbsp;&nbsp;&nbsp;" +
        "cm: " + conversionCalculator("length", value, unitValue, "cm") + "&nbsp;&nbsp;&nbsp;" +
        "yard: " + conversionCalculator("length", value, unitValue, "yard") + "&nbsp;&nbsp;&nbsp;" +
        "feet: " + conversionCalculator("length", value, unitValue, "feet") + "&nbsp;&nbsp;&nbsp;" +
        "inch: " + conversionCalculator("length", value, unitValue, "inch");
    updateResults("lengthResults", results);
}

function clickSubmitArea() {
    var value = document.getElementById("inputArea").value;
    var unitValue = document.getElementById("AreaUnit").value;
    var results = "square km: " + conversionCalculator("area", value, unitValue, "km2").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "square m: " + conversionCalculator("area", value, unitValue, "m2").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "square cm: " + conversionCalculator("area", value, unitValue, "cm2").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "square yard: " + conversionCalculator("area", value, unitValue, "yard2").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "square feet: " + conversionCalculator("area", value, unitValue, "feet2").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "square inch: " + conversionCalculator("area", value, unitValue, "inch2").toFixed(3);
    updateResults("areaResults", results);
}

function clickSubmitVolume() {
    var value = document.getElementById("inputVolume").value;
    var unitValue = document.getElementById("VolumeUnit").value;
    var results = "cube km: " + conversionCalculator("volume", value, unitValue, "km3").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "cube m: " + conversionCalculator("volume", value, unitValue, "m3").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "cube cm: " + conversionCalculator("volume", value, unitValue, "cm3").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "cube yard: " + conversionCalculator("volume", value, unitValue, "yard3").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "cube feet: " + conversionCalculator("volume", value, unitValue, "feet3").toFixed(3) + "&nbsp;&nbsp;&nbsp;" +
        "cube inch: " + conversionCalculator("volume", value, unitValue, "inch3").toFixed(3);
    updateResults("volumeResults", results);
}

//Conversion Calculators
function conversionCalculator(unitType, value, unitValue, desiredUnitValue) {
    if (unitType == "weight") {
        var gram = converToGram(value, unitValue);
        if (desiredUnitValue == "g")
            return gram;
        else if (desiredUnitValue == "kg")
            return gram * 0.001;
        else if (desiredUnitValue == "mg")
            return 1000 * gram;
        else if (desiredUnitValue == "lb")
            return 0.00220462 * gram;
        else if (desiredUnitValue == "tonne")
            return 0.000001 * gram;
        else
            return 0.035274 * gram;
    }

    else if (unitType == "length") {
        var m = contverToM(value, unitValue);
        if (desiredUnitValue == "m")
            return m;
        else if (desiredUnitValue == "km")
            return m * 0.001;
        else if (desiredUnitValue == "cm")
            return 100 * m;
        else if (desiredUnitValue == "yard")
            return 1.09361 * m;
        else if (desiredUnitValue == "feet")
            return 3.28084 * m;
        else
            return 39.3701 * m;
    }

    else if (unitType == "area") {
        var m = contverToM(value ** 0.5, unitValue.replace('2', ''));
        if (desiredUnitValue == "m2")
            return m ** 2;
        else if (desiredUnitValue == "km2")
            return (m ** 2) * (0.001 ** 2);
        else if (desiredUnitValue == "cm2")
            return (100 ** 2) * (m ** 2);
        else if (desiredUnitValue == "yard2")
            return (1.09361 ** 2) * (m ** 2);
        else if (desiredUnitValue == "feet2")
            return (3.28084 ** 2) * (m ** 2);
        else
            return (39.3701 ** 2) * (m ** 2);
    }

    else if (unitType == "volume") {
        var m = contverToM(value ** (1 / 3), unitValue.replace('3', ''));
        if (desiredUnitValue == "m3")
            return m ** 3;
        else if (desiredUnitValue == "km3")
            return (m ** 3) * (0.001 ** 3);
        else if (desiredUnitValue == "cm3")
            return (100 ** 3) * (m ** 3);
        else if (desiredUnitValue == "yard3")
            return (1.09361 ** 3) * (m ** 3);
        else if (desiredUnitValue == "feet3")
            return (3.28084 ** 3) * (m ** 3);
        else
            return (39.3701 ** 3) * (m ** 3);
    }
}

function converToGram(value, unitValue) {
    if (unitValue == "g")
        return value;
    else if (unitValue == "kg")
        return value * (1 / 0.001);
    else if (unitValue == "mg")
        return (1 / 1000) * value;
    else if (unitValue == "lb")
        return (1 / 0.00220462) * value;
    else if (unitValue == "tonne")
        return (1 / 0.000001) * value;
    else
        return (1 / 0.035274) * value;
}

function contverToM(value, unitValue) {
    if (unitValue == "m")
        return value;
    else if (unitValue == "km")
        return value * (1 / 0.001);
    else if (unitValue == "cm")
        return (1 / 100) * value;
    else if (unitValue == "yard")
        return (1 / 1.09361) * value;
    else if (unitValue == "feet")
        return (1 / 3.28084) * value;
    else
        return (1 / 39.3701) * value;
}


//This function makes use of jquery to update the content of the current page by loading a html file
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    window.scrollTo(0, 0);  //move the view back to the top of the window
}

function updateResults(elementID, results) {
    document.getElementById(elementID).innerHTML = results;
}


window.addEventListener("load", start, false);