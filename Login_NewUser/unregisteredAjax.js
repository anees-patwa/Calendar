//ajax function to log user into calendar website
function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = {
        'username': username,
        'password': password
    };

    fetch("loginAjax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`));
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false);

//ajax function to add new event to the calendar
function newEventAjax(event) {

}