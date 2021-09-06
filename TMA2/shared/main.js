/*Login Script*/
function start() {
    //document.getElementById("sidebar").style.display = "none";
    document.getElementById("loginButton").addEventListener(
        "click", clickLoginButton, false);
    document.getElementById("createAccountButton").addEventListener(
        "click", clickCreateAccountButton, false);
} // end function start


function clickLoginButton() {

    var name = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    //few checks to make sure user has entered info correct
    if (name == "") {
        document.getElementById("loginUsernameLabel").innerHTML = "<em class=\"redText\">*</em>Username:";
        document.getElementById("loginNotice").innerHTML = "<em class=\"redText\">Please enter Username</em>";
        return;
    }
    if (password == "") {
        document.getElementById("loginPasswordLabel").innerHTML = "<em class=\"redText\">*</em>Password:";
        document.getElementById("loginNotice").innerHTML = "<em class=\"redText\">Please enter Password</em>";
        return;
    }
    else {
        document.getElementById("lds-dual-ring").style.display = "inline-block";
        //document.getElementById("lds-dual-ring").style.display = "block"; //make load wheel visible
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
                if (this.responseText != "") {
                    console.log("login success");
                    var tmpArray = this.responseText.split(',');
                    console.log(tmpArray[0]);
                    console.log(tmpArray[1]);
                    selectApplication();
                }
                else {
                    console.log("invalid user");
                }
                document.getElementById("lds-dual-ring").style.display = "none";
                /*
                document.getElementById("createAccountNotice").innerHTML = "<em class=\"greenText\">Account Created!</em>";
                document.getElementById("createUserName").value = "";
                document.getElementById("createPassword").value = "";
                document.getElementById("createConfirmPassword").value = "";
                */
                //document.getElementById("txtHint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", "shared/checkLogin.php?name=" + name + "&password=" + password, true);
        xmlhttp.send();
    }
}

//Note: this is of course async
function selectApplication() {
    window.location.replace("shared/selectApplication.php");
}

function clickCreateAccountButton() {
    /*
    $(document).ready(function () {

        $('#loginForm').load("./shared/createAccountForm.html");
        document.getElementById("createNewAccountButton").addEventListener(
            "click", clickCreateNewAccountButton, false);
    });
    */
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loginForm").innerHTML = this.responseText;
            document.getElementById("createNewAccountButton").addEventListener(
                "click", clickCreateNewAccountButton, false);
            document.getElementById("returnLoginButton").addEventListener(
                "click", clickReturnLoginButton, false);
        }
    };
    xmlhttp.open("GET", "http://143.198.71.129/shared/createAccountForm.html", true);
    xmlhttp.send();
}

function clickReturnLoginButton() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("loginForm").innerHTML = this.responseText;
            start();
        }
    };
    xmlhttp.open("GET", "shared/loginForm.html", true);
    xmlhttp.send();
}
function clickCreateNewAccountButton() {
    console.log("clicked create button...");
    var name = document.getElementById("createUserName").value;
    var password = document.getElementById("createPassword").value;
    var confirmPassword = document.getElementById("createConfirmPassword").value;
    if (name == "") {
        document.getElementById("createUserNameLabel").innerHTML = "<em class=\"redText\">*</em>New Username:";
        document.getElementById("createAccountNotice").innerHTML = "<em class=\"redText\">Please create a Username</em>";
        return;
    }
    if (password == "") {
        document.getElementById("createPasswordLabel").innerHTML = "<em class=\"redText\">*</em>New Password:";
        document.getElementById("createAccountNotice").innerHTML = "<em class=\"redText\">Please create a Password</em>";
        return;
    }
    if (confirmPassword == "") {
        document.getElementById("createConfirmPasswordLabel").innerHTML = "<em class=\"redText\">*</em>Confirm Password:";
        document.getElementById("createAccountNotice").innerHTML = "<em class=\"redText\">Please confrim Password</em>";
        return;
    }
    if (confirmPassword != "" && password != "" && confirmPassword != password) {
        document.getElementById("createAccountNotice").innerHTML = "<em class=\"redText\">Passwords don't match</em>";
        return;
    }
    else {

        //document.getElementById("lds-dual-ring").style.display = "block"; //make load wheel visible
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("lds-dual-ring").style.display = "none"; //make load wheel invisible
                document.getElementById("createAccountNotice").innerHTML = "<em class=\"greenText\">Account Created!</em>";
                document.getElementById("createUserName").value = "";
                document.getElementById("createPassword").value = "";
                document.getElementById("createConfirmPassword").value = "";
                //document.getElementById("txtHint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET", "shared/createAccount.php?name=" + name + "&password=" + password, true);
        xmlhttp.send();
    }
}

//"./Main2_text_files/Main2_h)tml_u" + currentUnit + "_p" + currentPage + ".html"
function setContent(contentUrl) {

    $(document).ready(function () {

        $('#loginForm').load(contentUrl);

    });

    //window.scrollTo(0, 0);  //move the view back to the top of the window
}
/*
function clickMenuButton(){
    if(!sidebarVisible){
        document.getElementById("sidebar").style.display = "block";
        sidebarVisible = true;
    }
    else {
        document.getElementById("sidebar").style.display = "none";
        sidebarVisible = false;
    }
}*/


window.addEventListener("load", start, false);