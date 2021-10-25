var sidebarVisible = false;
function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener("click",clickMenuButton,false);
    document.getElementById("ContactButton").addEventListener("click",clickContactButton,false);
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

function clickContactButton(){
    
}

//"./Main2_text_files/Main2_h)tml_u" + currentUnit + "_p" + currentPage + ".html"
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}

window.addEventListener("load", start, false);