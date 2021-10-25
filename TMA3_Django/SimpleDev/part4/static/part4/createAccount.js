var sidebarVisible = false;

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}




function start() {
    document.querySelector('#createAccountSubmit').addEventListener('click', async () => {
        const firstName = document.getElementById('createFirstName').value;
        const lastName = document.getElementById('createLastName').value;
        const userName = document.getElementById('createUserName').value;
        const email = document.getElementById('createEmail').value;
        const password = document.getElementById('createPassword').value;

        if (firstName.length && lastName.length && userName.length && validateEmail(email) && password.length) {
            createUser({
                firstName,
                lastName,
                userName,
                email,
                password
            })
        } else {
            document.getElementById('createNotice').innerHTML = "<em class = \"greenText\">Invalid entries</em>";
        }
    })

} // end function start

const createUser = async (params) => {
    const url = new URL(`http://143.198.71.129:8000/part4/command/auth/createUser/`)
    const resp = await fetch(url, {
        method: 'POST',
        type: 'application/json',
        body: JSON.stringify(params)
    })

    if (resp.ok) {
        window.location.assign(resp.url)
    } else {
        alert('Backend error occured.')
        console.error(resp, resp.status)
    }
}
window.addEventListener("load", start, false);