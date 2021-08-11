var showQuizDropdown = false;
var currentUnit = 0; //unit 0 is the tutorial
var currentPage = 1;
var currentQuiz = 0; //quiz 0 is just a default value
var currentMaxPage = 1;
var maxPage = [1, 4, 5, 2, 2, 2, 2]; //The max page in each unit. Starting with [Unit0, Unit1, Unit2, ...]
var quizAnswers = [];

// register event handlers for buttons upon loading page
function start() {
    document.getElementById("Main2-Nav-tutorial-button").addEventListener("click", function () {
        clickUnitButton(0);
    });
    document.getElementById("Main2-Nav-Unit1-button").addEventListener("click", function () {
        clickUnitButton(1);
    });
    document.getElementById("Main2-Nav-Unit2-button").addEventListener("click", function () {
        clickUnitButton(2);
    });

    document.getElementById("Main2-Nav-Unit3-button").addEventListener("click", function () {
        clickUnitButton(3);
    });
    document.getElementById("Main2-Nav-Quiz1-button").addEventListener("click", function () {
        clickQuizButton(1);
    });
    document.getElementById("Main2-Nav-Quiz2-button").addEventListener("click", function () {
        clickQuizButton(2);
    });
    document.getElementById("Main2-Nav-Quiz3-button").addEventListener("click", function () {
        clickQuizButton(3);
    });

} // end function start

//This function occurs when a unit is selected. It will update the page to display the content related to that unit
function clickUnitButton(unitNumber) {
    //document.getElementById('tag-id').innerHTML = '<ol><li>html data</li></ol>';
    var contentUrl = "./Main2_text_files/Main2_html_u" + unitNumber + "_p1.html";
    currentQuiz = 0;
    currentUnit = unitNumber;

    //update the page variables
    currentPage = 1;
    currentMaxPage = maxPage[unitNumber];

    //update the content
    setContent(contentUrl);
    setPageNavigation();

    //set listeners for page navigation
    document.getElementById("Main2PreviousButton").addEventListener(
        "click", clickPreviousButton, false);
    document.getElementById("Main2NextButton").addEventListener(
        "click", clickNextButton, false);
}
//This function occurs when a quiz is selected. It will update the page to display the content related to that quiz
function clickQuizButton(quizNumber) {
    currentQuiz = quizNumber;
    currentMaxPage = 2;
    generateQuiz();
    setPageNavigation();
    document.getElementById("Main2SubmitButton").addEventListener(
        "click", clickSubmitButton, false);
    //if(document.getElementById('gender_Male').checked)
}

//This function makes use of jquery to update the content of the current page by loading a html file
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    window.scrollTo(0, 0);  //move the view back to the top of the window
}
//This funtion will update the page navigaiton at the bottom of the screen
function setPageNavigation() {

    //means we are viewing a unit, and should set a next and previous button
    if (currentQuiz === 0) {
        document.getElementById('Main2-Page-Navigation').innerHTML = "<button class=\"main2-banner-content-button-centered\" id=\"Main2PreviousButton\">Previous</button>" +
            "<button class=\"main2-banner-content-button-centered\" id=\"Main2NextButton\">Next</button>";
    }
    //Means we are viewing a quiz. Add a submit button
    else {
        document.getElementById('Main2-Page-Navigation').innerHTML = "<button class=\"main2-banner-content-button-centered\" id=\"Main2SubmitButton\">Submit</button>";
    }
}
//build the quiz by loopng through xml data
function generateQuiz() {
    quizAnswers = [];
    quizContent = "<div class=\"main2-banner-title\">Quiz " + currentQuiz + "</div>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
        else {
        }
    };
    xhttp.open("GET", "Main2_data_files/Quiz_data.xml", true);
    xhttp.send();

    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        document.getElementById("Main2-container").innerHTML = "";

        //gets the collection of the unit, gets the html element at entry 0 (units are all unique), then gets 
        //collection with all elements in unit with the entry name MultipleChoice
        var quizData = xmlDoc.getElementsByTagName("Unit" + currentQuiz)[0].getElementsByTagName("MultipleChoice"); //quizData is a html collection

        //id will take the from: q0A q0B, etc...
        //name will take the form: q0 q1 q2......
        for (let i = 0; i < quizData.length; i++) {
            quizContent = quizContent + "<div><p>" + (i + 1) + ". " + quizData[i].getElementsByTagName("Question")[0].childNodes[0].nodeValue + "</p><ul><li>" + "A) <input type=\"radio\" name=\"q" + i + "\" id=\"q" + i + "A\">" +
                quizData[i].getElementsByTagName("A")[0].childNodes[0].nodeValue + "</li><li>" + "B) <input type=\"radio\" name=\"q" + i + "\" id=\"q" + i + "B\">" + quizData[i].getElementsByTagName("B")[0].childNodes[0].nodeValue + "</li><li>" +
                "C) <input type=\"radio\" name=\"q" + i + "\" id=\"q" + i + "C\">" + quizData[i].getElementsByTagName("C")[0].childNodes[0].nodeValue + "</li><li>" + "D) <input type=\"radio\" name=\"q" + i + "\" id=\"q" + i + "D\">" + quizData[i].getElementsByTagName("D")[0].childNodes[0].nodeValue + "</li></ul></div>";
            quizAnswers[i] = quizData[i].getElementsByTagName("Answer")[0].childNodes[0].nodeValue;
        }
        document.getElementById("Main2-container").innerHTML = quizContent;
        //xmlDoc.getElementsByTagName("bodyParagraph")[1].childNodes[0].nodeValue;  //get data of second body paragraph
    }

}
function generateAnswers(finalScore, rightAnswer) {

    quizContent = "<div class=\"main2-banner-title\">Quiz " + currentQuiz + " Results: Your score was " + finalScore + "%</div>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
        else {
        }
    };
    xhttp.open("GET", "Main2_data_files/Quiz_data.xml", true);
    xhttp.send();

    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        document.getElementById("Main2-container").innerHTML = "";

        //gets the collection of the unit, gets the html element at enrty 0 (units are all unique), then gets 
        //collection with all elements in unit with the entry name MultipleChoice
        var quizData = xmlDoc.getElementsByTagName("Unit" + currentQuiz)[0].getElementsByTagName("MultipleChoice"); //this is a html collection

        //id will take the from: q0A q0B, etc...
        //name will take the form: q0 q1 q2......
        for (let i = 0; i < quizData.length; i++) {
            if (rightAnswer[i]) {
                quizContent = quizContent + "<div><p>" + (i + 1) + ". " + quizData[i].getElementsByTagName("Question")[0].childNodes[0].nodeValue + "<em class=\"greenText\">  Correct. Your answer was " +
                    quizAnswers[i] + "</em></p><ul><li>A) " +
                    quizData[i].getElementsByTagName("A")[0].childNodes[0].nodeValue + "</li><li>B) " + quizData[i].getElementsByTagName("B")[0].childNodes[0].nodeValue + "</li><li>C) " +
                    quizData[i].getElementsByTagName("C")[0].childNodes[0].nodeValue + "</li><li>D) " + quizData[i].getElementsByTagName("D")[0].childNodes[0].nodeValue + "</li></ul></div>";
            }
            else {
                quizContent = quizContent + "<div><p>" + (i + 1) + ". " + quizData[i].getElementsByTagName("Question")[0].childNodes[0].nodeValue + "<em class=\"redText\">  Incorrect. Correct answer is " +
                    quizAnswers[i] + "</em></p><ul><li>A) " + quizData[i].getElementsByTagName("A")[0].childNodes[0].nodeValue + "</li><li>B) " + quizData[i].getElementsByTagName("B")[0].childNodes[0].nodeValue + "</li><li>C) " +
                    quizData[i].getElementsByTagName("C")[0].childNodes[0].nodeValue + "</li><li>D) " + quizData[i].getElementsByTagName("D")[0].childNodes[0].nodeValue + "</li></ul></div>";
            }
        }
        document.getElementById("Main2-container").innerHTML = quizContent;
        //xmlDoc.getElementsByTagName("bodyParagraph")[1].childNodes[0].nodeValue;  //get data of second body paragraph
    }

}

//functions for changing the page
function clickPreviousButton() {
    if (currentPage > 1) {
        currentPage = currentPage - 1;
        var contentUrl = "./Main2_text_files/Main2_html_u" + currentUnit + "_p" + currentPage + ".html";
        setContent(contentUrl);  //change to new page
    }
    //else nothing happens
}
function clickNextButton() {
    if (currentPage < currentMaxPage) {
        currentPage = currentPage + 1;
        var contentUrl = "./Main2_text_files/Main2_html_u" + currentUnit + "_p" + currentPage + ".html";
        setContent(contentUrl);  //change to new page
    }
    //else nothing happens
}
function clickSubmitButton() {
    //if(document.getElementById('gender_Male').checked)
    //id will take the from: q0A
    var numCorrectAnswers = 0;
    var rightAnswer = [];
    for (let i = 0; i < quizAnswers.length; i++) {
        if (document.getElementById('q' + i + quizAnswers[i]).checked) {
            numCorrectAnswers = numCorrectAnswers + 1;
            rightAnswer[i] = true;
        }
        else {
            rightAnswer[i] = false;
        }
    }

    var finalScore = (numCorrectAnswers / quizAnswers.length) * 100;
    finalScore = Math.round(finalScore * 10) / 10;  //round to nearest tenth

    //update the page to results screen
    generateAnswers(finalScore, rightAnswer);
    document.getElementById('Main2-Page-Navigation').innerHTML = "";
}

window.addEventListener("load", start, false);