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
    const url =  new URL(`http://143.198.71.129:8000/part3/command/getParts/`)
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

        buildUI();
    });
}
function buildUI(){
    strUI = "";
    document.getElementById("main2-banner-title").innerHTML = "Your orders";
    //grab the relevant cookies that relate to the cart
    var cookieRegex = new RegExp("cartItem_[0-9]*");
    var allCookies = document.cookie.split(';');
    var cookieList = []
    var cartPrice = 0;
    for (let i=0;i<allCookies.length;i++){
        if(cookieRegex.test(allCookies[i].split("=")[0])){
            cookieList.push(allCookies[i]);
        }
    }

    //if no cookies found, means card is empty
    if(cookieList.length < 1){
        strUI = "<p>Your cart is empty!</p>";
        document.getElementById("cart_content").innerHTML = strUI;
        return;
    }
    globalCookieList = cookieList;
    for (let i = 0; i < cookieList.length; i++){
        //idArray = "[A,B,C,D,E,F,G,H]" , 0 = computerid, 1 = cpuid, 2 = graphicsid, 3 = harddriveID, 4 = ramID, 5 = osID,  6 = displayID, 7 = soundID
        idArray = cookieList[i].split("=")[1].split(",");  //grabs the cookie data

        currComputer = getComputer(idArray[0]);
        currCpu = getCpu(idArray[1]);
        currGraphics = getGraphics(idArray[2]);
        currHardDrive = getHardDrive(idArray[3]);
        currRam = getRam(idArray[4]);
        currOs = getOs(idArray[5]);
        currDisplay = getDisplay(idArray[6]);
        currSoundCard = getSoundCard(idArray[7]);

        var computerName = "<span class = \"partTitle\">" + currComputer.name + "</span>";
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
        + "onclick=\"deleteItem(\'" + cookieList[i].split("=")[0] + "\') \" class=\"addToCartButton\">Delete Item </button></p>";

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
    console.log("ok, the length is: " + globalCookieList.length);
    for(let i = 0; i < globalCookieList.length; i++){
        console.log("trying to delete: " + globalCookieList[i].split("=")[0]);
        deleteCookie(globalCookieList[i].split("=")[0]);
    }
    setCookie("numOrders", 0,1);
    buildUI();
    window.alert("Thank you for choosing SimpleDev!");
}

//item id = "A,B,C,D,E,F,G,H" , A = computerid, B = cpuid, C = graphicsid, D = harddriveID, E = ramID, F = osID,  G = displayID, H = soundID

function deleteItem(cookieName){
    //delete the cookie for that item
    deleteCookie(cookieName);

    //update total number of orders cookie
    setCookie("numOrders", orderCookie - 1,1);
    orderCookie = getCookie("numOrders");

    //rebuild the UI
    buildUI();

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
window.addEventListener("load", start, false);