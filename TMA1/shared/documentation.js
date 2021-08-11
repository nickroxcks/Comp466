function start() {
    document.getElementById("Main-Nav-Summary-button").addEventListener("click", function () {
        clickDocument(0);
    });
    document.getElementById("Main-Nav-Part1-button").addEventListener("click", function () {
        clickDocument(1);
    });
    document.getElementById("Main-Nav-Part2-button").addEventListener("click", function () {
        clickDocument(2);
    });
    document.getElementById("Main-Nav-Part3-button").addEventListener("click", function () {
        clickDocument(3);
    });
    document.getElementById("Main-Nav-Part4-button").addEventListener("click", function () {
        clickDocument(4);
    });


} // end function start


function clickDocument(doc){
    if(doc == 0){
        setContent("./shared/summary_doc.html");
    }
    else if(doc==1){
        setContent("./shared/part1_doc.html");
    }
    else if(doc==2){
        setContent("./shared/part2_doc.html");
    }
    else if(doc==3){
        setContent("./shared/part3_doc.html");
    }
    else{
        setContent("./shared/part4_doc.html");
    }
}
//This function makes use of jquery to update the content of the current page by loading a html file in the main container
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    window.scrollTo(0, 0);  //move the view back to the top of the window
}

window.addEventListener("load", start, false);