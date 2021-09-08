/*
Script run for Lesson Service
*/
var bookmarkData = [];
var current = null; // represents the current node for traversals
var previous = null; // represent prior node in traversals
var sidebarVisible = false;
var lessonID = [];
var globalCurrentLessonID;
var globalCurrentLessonName;
// register event handlers for buttons and load XML document
function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener(
        "click", clickMenuButton, false);
    document.getElementById("LessonUploadButton").addEventListener(
        "click", clickLessonUploadButton, false);
    document.getElementById("LessonHomeButton").addEventListener(
        "click", clickLessonHomeButton, false);
    document.getElementById("LessonManageButton").addEventListener(
        "click", clickLessonManageButton, false);
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
    lessonID = [];
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
                            "<em class=\"selectLesson\" href=\"../Users/U_" + tmpArray[i + 3] + "/L_" + tmpArray[i] + "/index.php\">" +
                            "<a href=\"../Users/U_" + tmpArray[i + 3] + "/L_" + tmpArray[i] + "/index.php\">" + tmpArray[i + 1] + ", Created by " + tmpArray[i + 2] + "</a></em></p>";
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
function clickLessonManageButton() {
    lessonID = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            var strContent = "<div class=\"main2-banner-title\">Courses You Created</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">";
            if (this.responseText != "empty") {
                var tmpArray = this.responseText.split(',');
                for (let i = 0; i < tmpArray.length; i = i + 4) {
                    if (tmpArray[i] != "") {  //0=lessonid 1=lessonname 2=author 3=userid
                        lessonID.push(tmpArray[i]);
                        strContent = strContent + "<p class=\"main2-banner-content-text-centered\" id=\"L" + tmpArray[i] + "\">" +
                            "<em class=\"selectLesson\" href=\"../Users/U_" + tmpArray[i + 3] + "/L_" + tmpArray[i] + "/index.php\">" +
                            "<a href=\"../Users/U_" + tmpArray[i + 3] + "/L_" + tmpArray[i] + "/index.php\">" + tmpArray[i + 1] + ", Created by " + tmpArray[i + 2] + "</a></em>" +
                            "<button onclick=\"clickAddUsers(" + tmpArray[i] + "," +"\'"+ tmpArray[i + 1] + "\'" + ")\">Add Users</button>" +
                            "<button onclick=\"editImages(" + tmpArray[i] + "," + "\'" + tmpArray[i + 1] + "\'" + ")\">Edit Images</button>" +
                            "</p>";
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
    xmlhttp.open("GET", "scripts/fetchMyLessons.php", true);
    xmlhttp.send();
}
function editImages(tmpLessonID, tmpLessonName) {
    globalCurrentLessonID = tmpLessonID;
    globalCurrentLessonName = tmpLessonName;
    clickAddImages(tmpLessonID, tmpLessonName);
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
                if (response == '0') {
                    alert("File not uploaded. Invalid format");
                } 
                else if(response=='1'){
                    alert("File was not able to be uploaded to the server");
                }
                else if(response=='2'){
                    alert("Invalid file format. Require at least 1 unit in LessonContent");
                }
                else if(response=='3'){
                    alert("Invalid file format. Unknown tag in LessonContent");
                }
                else {
                    var tmpArray = this.responseText.split(',');
                    globalCurrentLessonID = tmpArray[0];
                    globalCurrentLessonName = tmpArray[1];
                    clickAddImages(tmpArray[0], tmpArray[1]);
                    alert("Lesson has been created! You can upload your images for the lesson now, or do it at a later time!");
                }
            }
        };

        // Send request with data
        xhttp.send(formData);

    } else {
        alert("Please select a file");
    }

}

function clickAddImages(currentLessonID, currentLessonName) {
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
            xhttp.open("POST", "scripts/uploadImageScript.php?lessonID=" + globalCurrentLessonID, true);

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
        else {
            fetchLessons();
            alert("Successfully added images!")
        }

    } else {
        alert("Please select a file");
    }
}
function clickAddUsers(currentLessonID, currentLessonName) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var strContent = "<div class=\"main2-banner-title\">Add Users for \"" + currentLessonName + "\"</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">" + "<p class=\"main2-banner-content-text-centered bold\">Current Users:</p>";
            if (this.responseText != "empty") {
                var tmpArray = this.responseText.split(',');
                for (let i = 0; i < tmpArray.length; i++) {
                    if (tmpArray[i] != "") {
                        strContent = strContent + "<p class=\"main2-banner-content-text-centered\">" +
                        tmpArray[i]+"</p>";
                    }
                }
                strContent = strContent + "<p class=\"main2-banner-content-text-centered bold\">Enter A Valid Username:</p>";
                strContent = strContent + "<input type=\"text\" id=\"addUserName\" class=\"loginText\"><br>";
                strContent = strContent + "<button id=\"addUserSubmit\" class=\"loginText\" onclick=\"clickSubmitAddUser("+currentLessonID+")\">Add</button><br>";
                strContent = strContent + "<p class=\"loginText\" id=\"addUserNotice\"></p>";
                strContent = strContent + "</div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            else {
                strContent = strContent + "<p class=\"main2-banner-content-text-centered\">An Error occured</p></div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
        }
        else {
            console.log("failed to connect to DB");
        }
    };
    xmlhttp.open("GET", "scripts/getUsers.php?lessonID=" + currentLessonID, true);
    xmlhttp.send();
}

function clickSubmitAddUser(currentLessonID){
    var username = document.getElementById("addUserName").value;
    console.log("trying to add " + username);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("something was recieved");
            if (this.responseText == "success") {
                document.getElementById("addUserNotice").innerHTML = "<em class=\"greenText\">"+"Username "+username+" has been added to the lesson!</em>";
                console.log("suces");
            }
            else if(this.responseText == "empty") {
                document.getElementById("addUserNotice").innerHTML = "<em class=\"redText\">"+"Username "+username+ " Does not exist</em>";
                console.globalCurrentLessonID("empty");
            }
            else if(this.responseText == "User Exists"){
                document.getElementById("addUserNotice").innerHTML = "<em class=\"redText\">"+"Username "+username+ " is already added to lesson</em>";
                console.log("user exists");
            }
            else{
                document.getElementById("addUserNotice").innerHTML = "<em class=\"redText\">Failed to add User</em>";
                console.log("failed to add user: " + this.responseText);
            }
        }
        else {
                //troubeshoot
        }
    };
    xmlhttp.open("GET", "scripts/addUser.php?username=" + username+"&lessonID="+currentLessonID, true);
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