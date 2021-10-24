var sidebarVisible = false;
const SERVER_URL = 'http://localhost:8000'
function start() {

    document.querySelector('#loginButton').addEventListener('click', async () => {
        const username = document.getElementById('loginUsername').value
        const password = document.getElementById('loginPassword').value

        if (username.length && password.length) {
            const error = await login(username, password)

            if (error) {
                //document.getElementById('error').innerText = error
            }
        } else {
            //document.getElementById('error').innerText = 'Insufficient account information provided.'
        }
    })

} // end function start

const login = async (username, password) => {
    const url = new URL(`${SERVER_URL}/part4/command/auth/login/`)
    url.searchParams.append('username', username)
    url.searchParams.append('password', password)
    const resp = await fetch(url)

    if (resp.ok) {
        window.location.assign(resp.url)
    } else if (resp.status === 403) {
        document.getElementById("loginNotice").innerHTML = "<em class=\"redText\">Invalid credentials</em>";
        return 'Incorrect username or password.'
    } else {
        console.error(resp, resp.status)
        document.getElementById("loginNotice").innerHTML = "<em class=\"redText\">Unable to login</em>";
        return 'Unable to log in.'
    }
}
window.addEventListener("load", start, false);