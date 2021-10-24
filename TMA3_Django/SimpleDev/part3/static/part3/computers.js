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
function start() {
    getComputersJson();
    orderCookie = getCookie("numOrders");
    if(orderCookie){
        console.log("cookie for orders exists");
    }
    else{
        setCookie("numOrders", 0, 1);
        console.log("setting cooking");
    }
    //document.getElementById("get_parts_button").addEventListener("click",clickGetPartsButton,false);
} // end function start

function getComputersJson(){
    const url =  new URL(`http://localhost:8000/part3/command/getParts/`)
    $.getJSON(url, function (json) {
        //jsonData = json[currentPart];
        console.log(json["graphicsCard"][0].name);
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
    document.getElementById("computersTitle").innerHTML = "Computers Available For Purchase";
    for (let i = 0; i < computerJson.length; i++){
        //console.log("TESTING. COMPUTER ID IS: " + computerJson[i].id )
        currCpu = getCpu(computerJson[i].cpu);
        currGraphics = getGraphics(computerJson[i].graphicsCard);
        currHardDrive = getHardDrive(computerJson[i].hardDrive);
        currRam = getRam(computerJson[i].ram);
        currOs = getOs(computerJson[i].os);
        currDisplay = getDisplay(computerJson[i].display);
        currSoundCard = getSoundCard(computerJson[i].soundCard);

        var computerName = "<span class = \"partTitle\">" + computerJson[i].name + "</span>";
        var computerCPU = "<p>CPU: " + currCpu.name + ",    " + currCpu.price + " CAD</p>";
        var computerGraphics = "<p>Graphics: " + currGraphics.name + ",    " + currGraphics.price + " CAD</p>";
        var computerHardDrive = "<p>HardDrive: " + currHardDrive.name + ",    " + currHardDrive.price + " CAD</p>";
        var computerRam = "<p>Ram: " + currRam.name + ",    " + currRam.price + " CAD</p>";
        var computerOs = "<p>OS: " + currOs.name + ",    " + currOs.price + " CAD</p>";
        var computerDisplay = "<p>Display: " + currDisplay.name + ",    " + currDisplay.price + " CAD</p>";
        var computerSoundCard = "<p>Sound Card: " + currSoundCard.name + ",    " + currSoundCard.price + " CAD</p>";
        var totalPrice = parseFloat(currCpu.price) + parseFloat(currGraphics.price) + parseFloat(currHardDrive.price) + 
        parseFloat(currRam.price) + parseFloat(currOs.price) + parseFloat(currDisplay.price) + parseFloat(currSoundCard.price);

        computerPrice = "<p style = \"border-bottom: 3px solid #eee;\">Total Price: " + totalPrice + " CAD <button id=\"computerAddButton_" + computerJson[i].id + "\"" 
        + "onclick=\"addTocart(\'" + computerJson[i].id + "," + currCpu.id + "," + currGraphics.id + "," + currHardDrive.id + ","+ currRam.id + "," + currOs.id + "," 
        + currDisplay.id + "," + currSoundCard.id + "\') \" class=\"addToCartButton\">Add to Cart </button> " +
        "<button id=\"computerCustomizeButton_" + computerJson[i].id + "\" class=\"addToCartButton\"" +
        "onclick=\"customize(\'" + computerJson[i].id + "," + currCpu.id + "," + currGraphics.id + "," + currHardDrive.id + ","+ currRam.id + "," + currOs.id + "," 
        + currDisplay.id + "," + currSoundCard.id + "\')\""
        + ">Customize</button>"+ "<em class=\"greenText\" id=\"notification_" + computerJson[i].id + "\"></em></p>";

        strUI = strUI + computerName + computerCPU + computerGraphics + computerHardDrive + computerRam + computerOs + computerDisplay +
        computerSoundCard + computerPrice;
    }
    document.getElementById("computers_content").innerHTML = strUI;
}

//item id = "A,B,C,D,E,F,G,H" , A = computerid, B = cpuid, C = graphicsid, D = harddriveID, E = ramID, F = osID,  G = displayID, H = soundID
function addTocart(itemID){
    console.log("the item id clicked is: " + itemID);
    //console.log(getCookie("numOrders"));
    var numOrders = parseInt(getCookie("numOrders")) + 1;

    setCookie("cartItem_" + numOrders, itemID,1);
    setCookie("numOrders",numOrders,1);
    orderCookie = getCookie("numOrders");
    const myArr = itemID.split(",");
    //document.getElementById("notification_" + myArr[0]).innerHTML = "&nbsp;Added To Cart!";
    window.alert("added to cart!");
    buildUI();
}

function customize(itemID){
    document.getElementById("computers_content").innerHTML = "";
    document.getElementById("computersTitle").innerHTML = "Customize";

    //grab default values
    const myArr = itemID.split(",");
    var currComputer = getComputer(myArr[0]);
    var currCpu = getCpu(currComputer.cpu);
    var currGraphics = getGraphics(currComputer.graphicsCard);
    var currHardDrive = getHardDrive(currComputer.hardDrive);
    var currRam = getRam(currComputer.ram);
    var currOs = getOs(currComputer.os);
    var currDisplay = getDisplay(currComputer.display);
    var currSoundCard = getSoundCard(currComputer.soundCard);

    //create the html
    var computerName = "<span class = \"partTitle\">" + currComputer.name + "</span>";
    var computerCPU = "<p>CPU: " + "<em id=\"customCpu\">" + currCpu.name + ",    " + currCpu.price + "</em> CAD " + buildSelect("Cpu",currCpu) + "</p>";
    var computerGraphics = "<p>Graphics: " + "<em id=\"customGraphics\">" +  currGraphics.name + ",    " + currGraphics.price + "</em> CAD " + buildSelect("Graphics",currGraphics) + "</p>";
    var computerHardDrive = "<p>HardDrive: " + "<em id=\"customHardDrive\">" + currHardDrive.name + ",    " + currHardDrive.price + "</em> CAD " + buildSelect("HardDrive",currHardDrive) + "</p>";
    var computerRam = "<p>Ram: " + "<em id=\"customRam\">" + currRam.name + ",    " + currRam.price + "</em> CAD " + buildSelect("Ram",currRam) + "</p>";
    var computerOs = "<p>OS: " + "<em id=\"customOs\">" + currOs.name + ",    " + currOs.price + "</em> CAD " + buildSelect("Os",currOs) + "</p>";
    var computerDisplay = "<p>Display: " + "<em id=\"customDisplay\">" + currDisplay.name + ",    " + currDisplay.price + "</em> CAD " + buildSelect("Display",currDisplay) + "</p>";
    var computerSoundCard = "<p>Sound Card: " + "<em id=\"customSoundCard\">" + currSoundCard.name + ",    " + currSoundCard.price + "</em> CAD " + buildSelect("SoundCard",currSoundCard) + "</p>";
    var totalPrice = parseFloat(currCpu.price) + parseFloat(currGraphics.price) + parseFloat(currHardDrive.price) + 
    parseFloat(currRam.price) + parseFloat(currOs.price) + parseFloat(currDisplay.price) + parseFloat(currSoundCard.price);
    var computerPrice = "<p class=\"bold\" id=\"customPrice\">Total Price: <em>" + totalPrice + "</em> " + 
    "&nbsp;<button onclick=\"addTocart(\'" + currComputer.id + "," + currComputer.cpu + "," + currComputer.graphicsCard + "," + currComputer.hardDrive + ","+ currComputer.ram + "," + 
    currComputer.os + ","  + currComputer.display + "," + currComputer.soundCard + "\') \" class=\"addToCartButton\">Add to Cart </button></p>";

    document.getElementById("computers_content").innerHTML = computerName + computerCPU + computerGraphics + computerHardDrive + computerRam + computerOs + computerDisplay +
    computerSoundCard + computerPrice;

    addSelectListener("Cpu", currComputer);
    addSelectListener("Graphics",currComputer);
    addSelectListener("HardDrive",currComputer);
    addSelectListener("Ram",currComputer);
    addSelectListener("Os",currComputer);
    addSelectListener("Display",currComputer);
    addSelectListener("SoundCard",currComputer);
}

//use the partType specific in the json
/*
                        <select class="main2-banner-content-text-centered" id="parts_select">
                            <option value="cpu">CPU</option>
                            <option value="graphicsCard">Graphics Card</option>
                            <option value="ram">Ram</option>
                            <option value="hardDrive">Hard Drives</option>
                            <option value="os">OS</option>
                            <option value="display">Display</option>
                            <option value="soundCard">Sound Cards</option>
                        </select>
*/
function buildSelect(partType, currentPart){
    var partData;

    //create tag with default value
    var strSelect = "<select id=\"customize_select_" 
    + partType + "\" name=\"customize_select_" + partType + "\">"
    if(partType == "Cpu"){
        partData = cpuJson;
    }
    else if(partType=="Graphics"){
        partData = graphicsJson;
    }
    else if(partType=="HardDrive"){
        partData = hardDriveJson;
    }
    else if(partType=="Ram"){
        partData = ramJson;
    }
    else if(partType == "Os"){
        partData = osJson;
    }
    else if(partType == "Display"){
        partData = displayJson;
    }
    else{
        partData = soundCardJson;
    }

    for(let i=0;i<partData.length;i++){
        var partName = partData[i].name;
        var partPrice = partData[i].price;
        var partID = partData[i].id;
        if(partID == currentPart.id){
            strSelect = strSelect + "<option value=\"" + partName + "," + partPrice + "," + partID +  "\" selected>" + partName + ", " + partPrice + "$ CAD</option>"
        }
        else{
            strSelect = strSelect + "<option value=\"" + partName + "," + partPrice + "," + partID +  "\">" + partName + ", " + partPrice + "$ CAD</option>"
        }
    }
    strSelect = strSelect + "</select>"
    return strSelect;
}

function addSelectListener(partType, currComputer){

    var selectElement = document.getElementById("customize_select_" + partType);

    selectElement.addEventListener('change', function() {
        var myArr = selectElement.value.split(",");
        console.log(myArr[0]);
        document.getElementById("custom" + partType).innerHTML = myArr[0] + ",    " + myArr[1];

        //get the new total price
        var newPrice = parseFloat((document.getElementById("customize_select_Cpu").value.split(","))[1]) +
        parseFloat((document.getElementById("customize_select_Graphics").value.split(","))[1]) +
        parseFloat((document.getElementById("customize_select_HardDrive").value.split(","))[1]) + 
        parseFloat((document.getElementById("customize_select_Ram").value.split(","))[1]) +
        parseFloat((document.getElementById("customize_select_Os").value.split(","))[1]) +
        parseFloat((document.getElementById("customize_select_Display").value.split(","))[1]) + 
        parseFloat((document.getElementById("customize_select_SoundCard").value.split(","))[1]);

        var newCookie = currComputer.id + "," +
        (document.getElementById("customize_select_Cpu").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_Graphics").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_HardDrive").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_Ram").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_Os").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_Display").value.split(","))[2] + "," + 
        (document.getElementById("customize_select_SoundCard").value.split(","))[2];


        var computerPrice = "Total Price: <em>" + newPrice + "</em>" + 
        "&nbsp;<button onclick=\"addTocart(\'" + newCookie + "\') \" class=\"addToCartButton\">Add to Cart </button>";
        document.getElementById("customPrice").innerHTML = computerPrice;
    });
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


window.addEventListener("load", start, false);