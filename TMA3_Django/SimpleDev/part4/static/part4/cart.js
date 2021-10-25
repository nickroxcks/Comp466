var sidebarVisible = false;
var computerJson;
var cpuJson;
var graphicsJson;
var hardDriveJson;
var ramJson;
var osJson;
var displayJson;
var soundCardJson;
var orderCookie
var globalCookieList;
var cartJson;
function start() {
    getComputersJson();
    orderCookie = getCookie("numOrders");
    if(orderCookie){
    }
    else{
        setCookie("numOrders", 0, 1);
        console.log("setting cooking");
    }
    //document.getElementById("get_parts_button").addEventListener("click",clickGetPartsButton,false);
} // end function start

function getComputersJson(){
    const url =  new URL(`http://143.198.71.129:8000/part4/command/getParts/`)
    $.getJSON(url, function (json) {
        //jsonData = json[currentPart];
        computerJson = json["computers"];
        cpuJson = json["cpu"];
        graphicsJson = json["graphicsCard"];
        hardDriveJson = json["hardDrive"]
        ramJson = json["ram"];
        osJson = json["os"];
        displayJson = json["display"];
        soundCardJson = json["soundCard"];

        getCart()
    });
}
function getCart(){
    const url =  new URL(`http://143.198.71.129:8000/part4/command/getCart/`)
    $.getJSON(url, function (json) {
        //jsonData = json[currentPart];
        cartJson = json["cart"]

        buildUI()
    });

}

function buildUI(){
    strUI = "";
    document.getElementById("main2-banner-title").innerHTML = "Your orders";
    if(cartJson.length<1){
        strUI = "<p>Your cart is empty!</p>";
        document.getElementById("cart_content").innerHTML = strUI;
        return;
    }
    cartPrice = 0;
    for (let i = 0; i < cartJson.length; i++){
        //idArray = "[A,B,C,D,E,F,G,H]" , 0 = computerid, 1 = cpuid, 2 = graphicsid, 3 = harddriveID, 4 = ramID, 5 = osID,  6 = displayID, 7 = soundID
        console.log(cartJson[i])
        currName = cartJson[i].name;
        currCpu = getCpu(cartJson[i].cpu_id);
        currGraphics = getGraphics(cartJson[i].graphicsCard_id);
        currHardDrive = getHardDrive(cartJson[i].hardDrive_id);
        currRam = getRam(cartJson[i].ram_id);
        currOs = getOs(cartJson[i].os_id);
        currDisplay = getDisplay(cartJson[i].display_id);
        currSoundCard = getSoundCard(cartJson[i].soundCard_id);

        var computerName = "<span class = \"partTitle\">" + currName + "</span>";
        var computerCPU = "<p>CPU: " + currCpu.name + ",    " + currCpu.price + " CAD</p>";
        var computerGraphics = "<p>Graphics: " + currGraphics.name + ",    " + currGraphics.price + " CAD</p>";
        var computerHardDrive = "<p>HardDrive: " + currHardDrive.name + ",    " + currHardDrive.price + " CAD</p>";
        var computerRam = "<p>Ram: " + currRam.name + ",    " + currRam.price + " CAD</p>";
        var computerOs = "<p>OS: " + currOs.name + ",    " + currOs.price + " CAD</p>";
        var computerDisplay = "<p>Display: " + currDisplay.name + ",    " + currDisplay.price + " CAD</p>";
        var computerSoundCard = "<p>Sound Card: " + currSoundCard.name + ",    " + currSoundCard.price + " CAD</p>";
        var totalPrice = parseFloat(currCpu.price) + parseFloat(currGraphics.price) + parseFloat(currHardDrive.price) + 
        parseFloat(currRam.price) + parseFloat(currOs.price) + parseFloat(currDisplay.price) + parseFloat(currSoundCard.price);

        computerPrice = "<p style = \"border-bottom: 3px solid #eee;\">Total Price: " + totalPrice + " CAD <button " 
        + "onclick=\"deleteItem(\'" + cartJson[i].id + "\') \" class=\"addToCartButton\">Delete Item </button></p>";

        strUI = strUI + computerName + computerCPU + computerGraphics + computerHardDrive + computerRam + computerOs + computerDisplay +
        computerSoundCard + computerPrice;
        cartPrice = cartPrice + totalPrice;
    }
    strUI = strUI + "<button onclick=\"buildCheckoutUI(" + cartPrice +")\" class=\"checkoutButton\">CheckOut</button> Overall Cost: " + cartPrice;
    document.getElementById("cart_content").innerHTML = strUI;
    
}

function buildCheckoutUI(totalPrice){
    document.getElementById("main2-banner-title").innerHTML = "Total Cost: " + totalPrice;
    strUI = "<p class=\"main2-banner-content-text-centered\">Delivery Address</p>" + 
    "<input type=\"text\" class=\"loginText\">" +
    "<p class=\"main2-banner-content-text-centered\">CardNumber:</p>" +
    "<input type=\"text\"  class=\"loginText\">" +
    "<p class=\"main2-banner-content-text-centered\">CVC:</p>" +
    "<input type=\"text\" class=\"loginText\">" +
    "<br/>" +
    "<button onclick=\"placeOrder()\" class=\"checkoutButton loginText\">Place Order</button>"
    document.getElementById("cart_content").innerHTML = strUI;
}

function placeOrder(){
    for(let i = 0; i < cartJson.length; i++){
        deleteItem(cartJson[i].id);
    }
    getCart();
    window.alert("Thank you for choosing SimpleDev!");
}

async function deleteItem(cartID){

    const error = await deleteCartDB(cartID);

    if (error) {
        window.alert(error);
    }
}

const deleteCartDB = async (cartID) => {
    
    const url = new URL(`http://143.198.71.129:8000/part4/command/deleteCart/`)
    url.searchParams.append('cartID', cartID)

    const resp = await fetch(url)

    if (resp.ok) {
        getCart();
    } else if (resp.status === 403) {
        return 'Unable to delete item from cart';
    } else {
        return 'Unable to delete item from cart';
    }
}


function getComputer(computerID){
    for(let i=0; i<computerJson.length;i++){
        if(computerJson[i].id == computerID){
            return computerJson[i];
        }
    }
}
function getCpu(cpuID){
    for(let i=0; i<cpuJson.length;i++){
        if(cpuJson[i].id == cpuID){
            return cpuJson[i];
        }
    }
}
function getGraphics(graphicsID){
    for(let i=0; i<graphicsJson.length;i++){
        if(graphicsJson[i].id == graphicsID){
            return graphicsJson[i];
        }
    }
}
function getHardDrive(hardDriveID){
    for(let i=0; i<hardDriveJson.length;i++){
        if(hardDriveJson[i].id == hardDriveID){
            return hardDriveJson[i];
        }
    }
}
function getRam(ramID){
    for(let i=0; i<ramJson.length;i++){
        if(ramJson[i].id == ramID){
            return ramJson[i];
        }
    }
}
function getOs(osID){
    for(let i=0; i<osJson.length;i++){
        if(osJson[i].id == osID){
            return osJson[i];
        }
    }
}
function getDisplay(displayID){
    for(let i=0; i<displayJson.length;i++){
        if(displayJson[i].id == displayID){
            return displayJson[i];
        }
    }
}
function getRam(ramID){
    for(let i=0; i<ramJson.length;i++){
        if(ramJson[i].id == ramID){
            return ramJson[i];
        }
    }
}
function getSoundCard(soundCardID){
    for(let i=0; i<soundCardJson.length;i++){
        if(soundCardJson[i].id == soundCardID){
            return soundCardJson[i];
        }
    }
}



function setContent(contentUrl) {

    $(document).ready(function () {

        $('#Main2-container').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}



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
function deleteCookie(name) {   
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
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
function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}


window.addEventListener("load", start, false);