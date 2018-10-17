function changeToLoggedInUI() {
    //hide login form
    $("#loginForm").hide();

    //hide new user form
    $("#newUserForm").hide();

    //show new event form
    $("#addEvent").show();
}

function changeToGuestUI() {
    $("#loginForm").show();
    $("#newUserForm").show();
    $("#addEvent").hide();
}

//change to logged in UI if login was successful
function processLogin(data) {
    if (data.success) {
        changeToLoggedInUI();
    } else {
        console.log("failed login");
        changeToGuestUI();
    }
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

    //call server script to log user in
    fetch("loginAjax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => processLogin(data))
        .catch(error => console.error('Error:', error));
}

//add event listener for login form
document.getElementById("login_btn").addEventListener("click", loginAjax, false);

//alert user to successful registration
function processRegister(data) {
    if (data.error) {
        console.log(data.eMessage);
    } else {
        console.log("registration successful");
        alert("Now login using the login form");
    }
}

//ajax function to add new user to the calendar website
function newUserAjax(event) {
    const username = document.getElementById("usernameR").value; // Get the username from the form
    const password = document.getElementById("passwordR").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = {
        'username': username,
        'password': password
    };

    //call server script to register user and add them to database
    fetch("registerAjax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => processRegister(data))
        .catch(error => console.error('Error:', error))
}

//add event listener for register form
document.getElementById("register_btn").addEventListener("click", newUserAjax, false);