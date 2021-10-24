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