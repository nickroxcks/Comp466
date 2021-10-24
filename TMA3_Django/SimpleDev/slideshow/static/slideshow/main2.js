var isStart = false;
var numImagesLoaded = 0;  //used to track number of images loaded
var jsonData;  //global json data
var imageArray = [];  //global array of image objects. Used to easily access each image
var captionArray = [];  //global array of image captions. Used to easily access each image caption
var curImageIndex = 0;  //the imageArray index we are currently using
var mainInterval;  //the interval for the slideshow

var canvas;  //this is the canvas in the DOM
var context;  //global context variable to manipulate context of canvas
var currEffect;  //the current effect (string) found from the dropdown menu
var currOrder;  //the current ordering chosen by user
var imgPos;  //x position of image, used for animations

var alpha = 0.00;  //transparency(decimal from 0-1). 1 = opaque. 0 = invisible
var slideIncr = 0;
var effectInterval;
var sidebarVisible = false;


//Pre load json data via jquery.
function start() {

    document.getElementById("sidebar").style.display = "none";
    document.getElementById("menubutton").addEventListener("click",clickMenuButton,false);
    $.getJSON("http://localhost:8000/slideshow/command/getJson/", function (json) {
        jsonData = json['images'];
        //canvas = document.getElementById("drawSlideShow");
        canvas = document.getElementById('drawSlideShow');
        context = canvas.getContext('2d');
        currEffect = document.getElementById("effect");
        currOrder = document.getElementById("sequenceOrder");
        imgPos = canvas.width;
        for (let i = 0; i < jsonData.length; i++) {
            
            imageArray[i] = new Image();
            
            imageArray[i].onload = function () {
                updateButtons();  //will make start button visible after all images loaded
            }
            //imageArray[i].src = jsonData[i].imageUrl;
            getImage(i+1)
            captionArray[i] = jsonData[i].caption;
            console.log(jsonData[i].caption)
            console.log(jsonData[i].imageUrl)
        }
        updateButtons();
    });

} // end function start

async function getImage (i) {
    try {
        const blob = await download(i)
    } catch (err) {
        console.log(err)
        alert('Error on server getting image')
    }
}

async function download (i) {
    console.log("getting" + i)
    const url =  new URL(`http://localhost:8000/slideshow/command/getImage/${i}/`)
    const resp = await fetch(url, {
        method: 'GET'
    })

    const blob = await resp.blob()
    imageArray[i-1].src = URL.createObjectURL(blob)
    return blob
}

function clickStartStop() {

    if (!isStart) {
        curImageIndex = 0;
        isStart = true;
        document.getElementById("Main3StartStopButton").innerHTML = "Stop";
        document.getElementById("sequenceOrder").disabled = true;
        if (currOrder.value == "random") {
            //update to random image order
            shuffleImages();
        }
        else {
            document.getElementById("Main3NextButton").style.display = "inline-block";
            document.getElementById("Main3PrevButton").style.display = "inline-block";
            document.getElementById("Main3NextButton").addEventListener("click",
                clickNext, false);
            document.getElementById("Main3PrevButton").addEventListener("click",
                clickPrev, false);
        }
        setTime();
    }
    else {
        isStart = false;
        document.getElementById("Main3StartStopButton").innerHTML = "Start";
        clearInterval(mainInterval);
        if (currOrder.value == "sequential") {
            document.getElementById("Main3NextButton").style.display = "none";
            document.getElementById("Main3PrevButton").style.display = "none";
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("sequenceOrder").disabled = false;
    }
}

function setTime() {
    DisplayImage(imageArray[curImageIndex]);
    if (currEffect.value == "none" && (curImageIndex < imageArray.length)) {
        mainInterval = setInterval(function () { DisplayImage(imageArray[curImageIndex]); }, 3000);
    }
    else if (currEffect.value == "slide") {
        mainInterval = setInterval(function () { DisplayImage(imageArray[curImageIndex]); }, 4000);
    }
    else if (currEffect.value == "fade") {
        mainInterval = setInterval(function () { DisplayImage(imageArray[curImageIndex]); }, 4000);
    }
}

function clickNext() {
    document.getElementById("Main3NextButton").removeEventListener("click",
        clickNext, false);
    if (curImageIndex < (imageArray.length - 1)) {
        clearInterval(mainInterval);
        setTime();
    }
    else if (curImageIndex == imageArray.length - 1) {
        curImageIndex = imageArray.length - 1;
        clearInterval(mainInterval);
        setTime();
    }
}

function clickPrev() {
    document.getElementById("Main3PrevButton").removeEventListener("click",
        clickPrev, false);
    if (curImageIndex > 0) {
        clearInterval(mainInterval);
        if (curImageIndex == 1)  //hard coded edge case
            curImageIndex--;
        else
            curImageIndex = curImageIndex - 2;
        setTime();
    }
}

//reshuffles array. Utilizing commonly known Knuth Shuffle Algorithm
function shuffleImages() {
    var currentIndex = imageArray.length, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [imageArray[currentIndex], imageArray[randomIndex]] = [
            imageArray[randomIndex], imageArray[currentIndex]];
        [captionArray[currentIndex], captionArray[randomIndex]] = [
            captionArray[randomIndex], captionArray[currentIndex]];
    }
}


function DisplayImage(curImage) {
    if (currEffect.value == "none" && isStart)
        imageTransition(curImage);
    else if (currEffect.value == "fade" && isStart) {
        alpha = 0.00;  //starts off fully transparent, then every 60ms makes it more opaque
        effectInterval = setInterval(function () { imageTransition(curImage) }, 60);
    }
    else if (currEffect.value == "slide" && isStart)//slide
    {
        effectInterval = setInterval(function () { imageTransition(curImage) }, 30);
    }
}

function imageTransition(curImage) {
    if (currEffect.value == "fade") {
        alpha = alpha + 0.08;
    }
    else {  //no effect or slide effect
        alpha = 1;
    }
    context.globalAlpha = alpha;  //update opaqueness
    context.imageSmoothingEnabled = true;  //really helps improve quality

    if (currEffect.value == "slide") {
        slideIncr++;
        imgPos = canvas.width - (canvas.width / 30 * slideIncr);
    }
    else {
        imgPos = 0;
    }

    context.drawImage(curImage, imgPos, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(46,49,49,0.5)';
    context.fillRect(0, canvas.height - 50, canvas.width, 100);

    context.font = "15pt Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText((curImageIndex + 1) + ". " + captionArray[curImageIndex], canvas.width / 2, canvas.height - 20);

    if (checkFinished()) {
        clearInterval(effectInterval);
        if (currOrder.value == "sequential") {
            document.getElementById("Main3NextButton").addEventListener("click",
                clickNext, false);
            document.getElementById("Main3PrevButton").addEventListener("click",
                clickPrev, false);
        }
        curImageIndex++;
        if (curImageIndex >= imageArray.length) {
            clearInterval(mainInterval);
            document.getElementById("Main3NextButton").style.display = "none";
            document.getElementById("Main3PrevButton").style.display = "none";
            document.getElementById("Main3StartStopButton").innerHTML = "Start";
            isStart = false;
            document.getElementById("sequenceOrder").disabled = false;
        }
    }
}

function checkFinished() {
    if (currEffect.value == "none")
        return true;

    else if (currEffect.value == "fade") {
        if (alpha > 1.00) {
            alpha = 0.00;
            return true;
        }
    }

    if (currEffect.value == "slide") {
        if (imgPos <= 0) {
            slideIncr = 0;
            return true;
        }
    }
}

function updateButtons() {

    //once all images loaded, make the button visible. This is in case start is hit before images loaded
    numImagesLoaded = numImagesLoaded + 1;
    if (numImagesLoaded == jsonData.length) {
        document.getElementById("Main2-Page-Navigation").style.display = "block";
        document.getElementById("Main3StartStopButton").addEventListener("click",
            clickStartStop, false);
    }
}

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

window.addEventListener("load", start, false);