var sidebarVisible = false;
function start() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener("click",clickMenuButton,false);
    document.getElementById("contactSubmit").addEventListener("click",clickContactSubmitButton,false);
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
/*
<p class="main2-banner-content-text-centered">Name:</p>
                        <input type="text" id="contactName" class="loginText">
                        <p class="main2-banner-content-text-centered">Email:</p>
                        <input type="text" id="contactEmail" class="loginText">
                        <p class="main2-banner-content-text-centered">Feedback:</p>
                        <input type="text" id="contactFeedback" class="loginText" style="width: 500px; height: 200px;">


*/
function clickContactSubmitButton(){
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactFeedback").value = "";
    document.getElementById("contactNotification").innerHTML = "<em class=\"greenText\">Thanks for the feedback!</em>";

}

//"./Main2_text_files/Main2_h)tml_u" + currentUnit + "_p" + currentPage + ".html"
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}

window.addEventListener("load", start, false);