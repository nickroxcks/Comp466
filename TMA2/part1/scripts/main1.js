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
// register event handlers for buttons and load XML document
function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener(
        "click", clickMenuButton, false);
    document.getElementById("BookmarkHomeButton").addEventListener(
        "click", clickHomeButton, false);
    document.getElementById("BookmarkYourBookmarksButton").addEventListener(
        "click", clickYourBookmarksbutton, false);
    document.getElementById("BookmarkAddBookmarkButton").addEventListener(
        "click", clickAddBookmarkButton, false);
    document.getElementById("BookmarkDeleteBookmarkButton").addEventListener(
        "click", clickDeleteBookmarkButton, false);

    //BookmarkEditBookmarkButton

    //document.getElementById("parentNode").addEventListener(
    //"click", processParentNode, false);
    //loadXMLDocument('article.xml')
    getTopTenBookmarks();
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
function clickHomeButton() {
    getTopTenBookmarks();
}

function getTopTenBookmarks() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            var strContent = "<div class=\"main2-banner-title\">Top 10 most popular Bookmarks</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">";
            if (this.responseText != "") {
                var tmpArray = this.responseText.split(',');
                for (let i = 0; i < tmpArray.length; i++) {
                    strContent = strContent + "<p class=\"main2-banner-content-text-centered\"><a href=\"" + tmpArray[i] + "\">" + tmpArray[i] + "</a></p>";
                }
                strContent = strContent + "</div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            else {
                strContent = strContent + "<p class=\"main2-banner-content-text-centered\">No popular websites!</p></div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            //document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "scripts/getTopTen.php", true);
    xmlhttp.send();
}

function clickYourBookmarksbutton() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            var strContent = "<div class=\"main2-banner-title\">Your Bookmarks</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">";
            if (this.responseText != "") {
                var tmpArray = this.responseText.split(',');
                strContent = strContent + "<div id=\"main2-banner-content\">";
                for (let i = 0; i < tmpArray.length; i++) {
                    strContent = strContent + "<p class=\"main2-banner-content-text-centered\"><a href=\"" + tmpArray[i] + "\">" + tmpArray[i] + "</a></p>";
                }
                strContent = strContent + "</div>"
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            else {
                strContent = strContent + "<p class=\"main2-banner-content-text-centered\">You have no bookmarks!</p></div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            //document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "scripts/getYourBookmarks.php", true);
    xmlhttp.send();
}

function clickAddBookmarkButton() {
    var strContent = "<div class=\"main2-banner-title\">Add Bookmark</div>";
    strContent = strContent + "<div id=\"main2-banner-content\">";
    strContent = strContent + "<p class=\"main2-banner-content-text-centered\">Enter a valid url:</p>";
    strContent = strContent + "<input type=\"text\" id=\"userUrl\" class=\"loginText\"><br>";
    strContent = strContent + "<button id=\"userUrlSubmit\" class=\"loginText\">Submit</button><br>";
    strContent = strContent + "<p class=\"loginText\" id=\"addBookmarkNotice\"></p>";

    strContent = strContent + "</div>"

    document.getElementById("Main2-container").innerHTML = strContent;

    document.getElementById("userUrlSubmit").addEventListener(
        "click", clickUrlSubmitButton, false);

}

function clickUrlSubmitButton() {
    //tested using web server ipv4 address and regex validators
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    var str = document.getElementById("userUrl").value;
    if (pattern.test(str)) {
        console.log("correct. testing url");
        var request = new XMLHttpRequest();
        request.open('GET', str, true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 404) {
                    console.log("Oh no, it does not exist!");
                    document.getElementById("addBookmarkNotice").innerHTML = "<em class=\"redText\">Please Enter a valid URL</em>";
                }
                else {
                    console.log("good it exists");
                    addNewBookmark(str);
                }
            }
        };
        request.send();
    }
    else {
        console.log("Bad URL");
        document.getElementById("addBookmarkNotice").innerHTML = "<em class=\"redText\">Please Enter a valid URL</em>";
    }
}

function addNewBookmark(str) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            document.getElementById("userUrl").value = "";
            document.getElementById("addBookmarkNotice").innerHTML = "<em class=\"greenText\">Added to your bookmarks!</em>";
        }
        else {
            document.getElementById("addBookmarkNotice").innerHTML = "<em class=\"redText\">Unable to add bookmark</em>";
        }
    };
    xmlhttp.open("GET", "scripts/addBookmark.php?newURL=" + str, true);
    xmlhttp.send();
}

function clickDeleteBookmarkButton() {
    bookmarkData = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            var strContent = "<div class=\"main2-banner-title\">Edit Bookmarks</div>";
            strContent = strContent + "<div id=\"main2-banner-content\">";
            if (this.responseText != "") {
                var tmpArray = this.responseText.split(',');
                strContent = strContent + "<div id=\"main2-banner-content\">";
                for (let i = 0; i < tmpArray.length - 1; i++) {  //Dont forget end comma
                    strContent = strContent + "<p id=\"bookmark" + i + "\" class=\"main2-banner-content-text-centered\"> " + tmpArray[i] +
                        "&nbsp&nbsp <button onclick=\"deleteEntry(" + i + ")\">Delete</button>" +
                        "&nbsp&nbsp <button onclick=\"editEntry(" + i + ")\">Edit</button>" + "</p>";
                    bookmarkData[i] = tmpArray[i];
                }
                strContent = strContent + "</div>"
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            else {
                strContent = strContent + "<p class=\"main2-banner-content-text-centered\">You have no bookmarks!</p></div>";
                document.getElementById("Main2-container").innerHTML = strContent;
            }
            //document.getElementById("txtHint").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "scripts/getYourBookmarks.php", true);
    xmlhttp.send();
}

function deleteEntry(i) {
    //console.log(bookmarkData.length);
    //console.log(i);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
            clickDeleteBookmarkButton();
        }
    };
    xmlhttp.open("GET", "scripts/deleteBookmark.php?deleteURL=" + bookmarkData[i], true);
    xmlhttp.send();
}

function editEntry(i) {
    document.getElementById("bookmark" + i).innerHTML = 
    "<input value=\"" + bookmarkData[i] +"\" type=\"text\" id=\"bookmarkValue" + i + "\">" +
        "&nbsp&nbsp <button onclick=\"saveEntry(" + i + ")\">Save</button>";
}

function saveEntry(i) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    var str = document.getElementById("bookmarkValue" + i).value;
    console.log("the value entered is " + document.getElementById("bookmarkValue" + i).value);
    if (pattern.test(str)) {
        console.log("correct. testing url");
        var request = new XMLHttpRequest();
        request.open('GET', str, true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 404) {
                    console.log("url doesnt exist");
                    document.getElementById("bookmark" + i).innerHTML = bookmarkData[i] +
                        "&nbsp&nbsp <button onclick=\"deleteEntry(" + i + ")\">Delete</button>" +
                        "&nbsp&nbsp <button onclick=\"editEntry(" + i + ")\">Edit</button>" +
                        "&nbsp&nbsp <em class=\"redText\">Invalid URL. Changes not saved</em>";
                }
                else {
                    console.log("url exists, updating bookmark");
                    updateBookmark(str, i);
                }
            }
        };
        request.send();
    }
    else {
        console.log("Bad URL");
        document.getElementById("bookmark"+i).innerHTML = bookmarkData[i] +
        "&nbsp&nbsp <button onclick=\"deleteEntry(" + i + ")\">Delete</button>" +
        "&nbsp&nbsp <button onclick=\"editEntry(" + i + ")\">Edit</button>" +
        "&nbsp&nbsp <em class=\"redText\">Invalid URL. Changes not saved</em>";
    }
}

//after pressing save and the bookmark is valid, update the existing bookmark index i to str value
function updateBookmark(str, i) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            clickDeleteBookmarkButton();  //update page
            bookmarkData[i] = str;
        }
        else {
            console.log("failed to connect to DB");
        }
    };
    xmlhttp.open("GET", "scripts/updateBookmark.php?oldURL=" + bookmarkData[i] + "&newURL=" + str, true);
    xmlhttp.send();
    //xmlhttp.open("GET", "shared/createAccount.php?name=" + name + "&password=" + password, true);
}

window.addEventListener("load", start, false);