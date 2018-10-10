function changeToLoggedInUI() {
    //hide login form
    $("#loginForm").hide();

    //hide new user form
    $("#newUserForm").hide();

    //show new event form
    $("#addEvent").show();

    //show calendar
    $("#cal").show();
}

function processLogin(data) {
    if (data.success) {
        changeToLoggedInUI();
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

document.getElementById("login_btn").addEventListener("click", loginAjax, false);

function processRegister(data) {
    if (data.error) {
        console.log(data.eMessage);
    } else {
        console.log("login successful");
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

    fetch("registerAjax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
}

document.getElementById("register_btn").addEventListener("click", newUserAjax, false);