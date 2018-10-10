function changeToLoggedInUI(event) {
    //hide login form
    $("#loginForm").hide();

    //hide new user form
    $("#newUserForm").hide();

    //show new event form
    $("#newEventForm").show();

    //show calendar
    $("#cal").show();
}

//ajax function to log user into calendar website
function loginAjax(event) {
    const username = document.getElementById("usernameL").value; // Get the username from the form
    const password = document.getElementById("passwordL").value; // Get the password from the form

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
        .then(data => console.log(data));
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false);

//ajax function to add new user to the calendar website
function newEventAjax(event) {

}