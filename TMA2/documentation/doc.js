/*Documentation Script */
var sidebarVisible = false;

function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener("click",clickMenuButton(),false);
    document.getElementById("DocHomeButton").addEventListener("click", function () {
        setContent("documentation/home.html");
    });
    document.getElementById("DocArchitectureButton").addEventListener("click", function () {
        setContent("documentation/architecture.html");
    });
    document.getElementById("DocPart1Button").addEventListener("click", function () {
        setContent("documentation/part1doc.html");
    });
    document.getElementById("DocPart2Button").addEventListener("click", function () {
        setContent("documentation/part2doc.html");
    });
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

//"./Main2_text_files/Main2_h)tml_u" + currentUnit + "_p" + currentPage + ".html"
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}


window.addEventListener("load", start, false);