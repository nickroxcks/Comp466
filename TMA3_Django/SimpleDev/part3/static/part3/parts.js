var sidebarVisible = false;
function start() {
    document.getElementById("get_parts_button").addEventListener("click",clickGetPartsButton,false);
} // end function start

function clickGetPartsButton(){
    var currentPart = document.getElementById("parts_select").value;
    const url =  new URL(`http://143.198.71.129:8000/part3/command/getParts/`)
    $.getJSON(url, function (json) {
        jsonData = json[currentPart];
        buildUI(jsonData,currentPart);

    });
}

function buildUI(jsonData,currentPart){
    strUI = "";

    for (let i = 0; i < jsonData.length; i++){
        partName = "<span class = \"partTitle\">" + jsonData[i].name + "</span>";
        partPrice = "<p>Price: " + jsonData[i].price + " CAD</p>";
        partDescription = "<p>Description: </p> <p style = \"border-bottom: 3px solid #eee;\"> " + jsonData[i].description + "</p>";
        strUI = strUI + partName + partPrice + partDescription;
    }
    document.getElementById("parts_content").innerHTML = strUI;
}
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}

window.addEventListener("load", start, false);