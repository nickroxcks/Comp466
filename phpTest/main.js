/*
All portions of the assignemnt run this script. 
*/

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
    //document.getElementById("parentNode").addEventListener(
        //"click", processParentNode, false);
    //loadXMLDocument('article.xml')
} // end function start

function clickMenuButton(){
    if(!sidebarVisible){
        document.getElementById("sidebar").style.display = "block";
        sidebarVisible = true;
    }
    else {
        document.getElementById("sidebar").style.display = "none";
        sidebarVisible = false;
    }
}


window.addEventListener("load", start, false);