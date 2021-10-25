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


/*
function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = 'expires='+ d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
}

function incrementCounter () {
    const cookie = getCookie('counter')
    if (cookie) {
        const counterEl = document.getElementById('counter')
        const newVal = parseInt(cookie) + 1
        counterEl.innerText = newVal
        setCookie('counter', newVal, 365)
    } else {
        setCookie('counter', 0, 365)
    }
}

function getIp () {
    fetch('https://api.ipify.org/?format=json')
        .then(resp => resp.json())
        .then(data => document.getElementById('ip').innerText = data.ip)
}

function getTimezone () {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    document.getElementById('timezone').innerText = tz
}

function main () {
    incrementCounter()
    getIp()
    getTimezone()
    start()
}

window.onload = main    
*/

window.addEventListener("load", start, false);