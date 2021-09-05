/*
All portions of the assignemnt run this script. 
*/
var bookmarkData = [];
var outputHTML = ""; // stores text to output in outputDiv
var idCounter = 1; // used to create div IDs
var depth = -1; // tree depth is -1 to start
var current = null; // represents the current node for traversals
var previous = null; // represent prior node in traversals
var sidebarVisible = false;
var lessonID = [];
var currentLessonID;
var currentLessonName;
// register event handlers for buttons and load XML document
function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener(
        "click", clickMenuButton, false);
    document.getElementById("LessonUploadButton").addEventListener(
        "click", clickLessonUploadButton, false);
    document.getElementById("LessonHomeButton").addEventListener(
        "click", clickLessonHomeButton, false);
    fetchLessons();
} // end function start

function clickMenuButton() {
    if (!sidebarVisible) {
        document.getElementById("sidebar").style.display = "block";
        sidebarVisible = true;
    }
    else {
        document.getElementById("sidebar").style.display = "none";
        sidebarVisible = false;
    }
}

function clickLessonHomeButton() {
    fetchLessons();
}
function fetchLessons() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            var strContent = "<div class=\"main2-banner-title\">Courses For You</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">";
            if (this.responseText != "empty") {
                var tmpArray = this.responseText.split(',');
                for (let i = 0; i < tmpArray.length; i = i + 4) {
                    if (tmpArray[i] != "") {  //0=lessonid 1=lessonname 2=author 3=userid
                        lessonID.push(tmpArray[i]);
                        strContent = strContent + "<p class=\"main2-banner-content-text-centered\" id=\"L" + tmpArray[i] + "\">" +
                            "<em class=\"selectLesson\" href=\"../Users/U_" +tmpArray[i+3]+"/L_"+tmpArray[i]+"/index.php\">" +
                            "<a href=\"../Users/U_" +tmpArray[i+3]+"/L_"+tmpArray[i]+"/index.php\">" + tmpArray[i + 1] + ", Created by " + tmpArray[i + 2] + "</a></em></p>";
                        //strContent = strContent + "<p class=\"main2-banner-content-text-centered\" id=\"L" + tmpArray[i] + "\">" +
                        //"<em class=\"selectLesson\" onclick=\"clickLesson(" + tmpArray[i] + "," + tmpArray[i + 3] + ")\">" + tmpArray[i + 1] + ", Created by " + tmpArray[i + 2] + "</em></p>";
                    }
                    //strContent = strContent + "<p class=\"main2-banner-content-text-centered\"><a href=\"" + tmpArray[i] + "\">" + tmpArray[i] + "</a></p>";
                }
                strContent = strContent + "</div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            else {
                strContent = strContent + "<p class=\"main2-banner-content-text-centered\">You have no courses!</p></div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            //document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "scripts/fetchLessons.php", true);
    xmlhttp.send();
}
//updates the UI to show the upload buttons
function clickLessonUploadButton() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Main2-container").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "html/uploadhtml.html", true);
    xmlhttp.send();
}

function sendFile() {
    var files = document.getElementById("file").files;

    if (files.length == 1) {

        var formData = new FormData();
        formData.append("file", files[0]);

        var xhttp = new XMLHttpRequest();

        // Set POST method and ajax file path
        xhttp.open("POST", "parser.php", true);

        // call on request changes state
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var response = this.responseText;
                if (response != 0) {
                    var tmpArray = this.responseText.split(',');
                    currentLessonID = tmpArray[0];
                    currentLessonName = tmpArray[1];
                    clickAddImages();
                    alert("Lesson has been created! You can upload your images for the lesson now, or do it at a later time!");
                } else {
                    alert("File not uploaded. Invalid format");
                }
            }
        };

        // Send request with data
        xhttp.send(formData);

    } else {
        alert("Please select a file");
    }

}

function clickAddImages() {
    //main2-banner-title
    console.log("current id is " + currentLessonID);
    console.log("current lesson name is " + currentLessonName);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Main2-container").innerHTML = this.responseText;
            document.getElementById("main2-banner-title").innerHTML = "Please upload your images for the lesson \"" + currentLessonName + "\". You can select multiple images at a time.";
        }
    };
    xmlhttp.open("GET", "html/uploadImages.html", true);
    xmlhttp.send();
}
function sendImages() {
    var files = document.getElementById("file").files;
    var failedImages = [];
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var formData = new FormData();
            formData.append("file", files[i]);

            var xhttp = new XMLHttpRequest();

            // Set POST method and ajax file path
            //?name=" + name + "&password=" + password
            xhttp.open("POST", "scripts/uploadImageScript.php?lessonID=" + currentLessonID, true);

            // call on request changes state
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = this.responseText;
                    if (response == 1) {
                        console.log("successful");
                    }
                    else {
                        console.log("failed on" + response);
                        failedImages.push(response);
                    }
                }
            };

            // Send request with data
            xhttp.send(formData);
        }
        if (failedImages.length > 0) {
            alertMessage = 'Failed to upload files ';
            for (var i = 0; i < failedImages.length; i++) {
                alertMessage = alertMessage + failedImages[i] + " ";
            }
            alert(alertMessage);
        }
        else{
            fetchLessons();
            alert("Successfully added images!")
        }

    } else {
        alert("Please select a file");
    }
}
function clickLesson(tmpLessonID, tmpUserID) {  //lesson id is the id of the lesson, user id is the id of the user where the lesson resides
    //download the html files and content from the server and store them on the client machine in a array in the form of string arrays

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loginForm").innerHTML = this.responseText;
            start();
        }
    };
    xmlhttp.open("GET", "", true);
    xmlhttp.send();
}

//This funtion will update the page navigaiton at the bottom of the screen
function setPageNavigation() {

    //means we are viewing a unit, and should set a next and previous button
    if (currentQuiz === 0) {
        document.getElementById('Main2-Page-Navigation').innerHTML = "<button class=\"main2-banner-content-button-centered\" id=\"Main2PreviousButton\">Previous</button>" +
            "<button class=\"main2-banner-content-button-centered\" id=\"Main2NextButton\">Next</button>";
        //set listeners for page navigation
        document.getElementById("Main2PreviousButton").addEventListener(
            "click", clickPreviousButton, false);
        document.getElementById("Main2NextButton").addEventListener(
            "click", clickNextButton, false);
    }
    //Means we are viewing a quiz. Add a submit button
    else {
        document.getElementById('Main2-Page-Navigation').innerHTML = "<button class=\"main2-banner-content-button-centered\" id=\"Main2SubmitButton\">Submit</button>";
    }
}

window.addEventListener("load", start, false);