function changeToLoggedInUI(token) {
    //hide login form
    $("#loginForm").hide();

    //hide new user form
    $("#newUserForm").hide();

    //show new event form
    $("#addEvent").show();

    $("#token").val(token);
}

function changeToGuestUI() {
    $("#loginForm").show();
    $("#newUserForm").show();
    $("#addEvent").hide();
}

//change to logged in UI if login was successful
function processLogin(data) {
    if (data.success == "true") {
        console.log("login successful");
        const token = data.token;
        console.log(data.token);
        changeToLoggedInUI(token);

    } else {
        console.log("failed login");
        changeToGuestUI();
    }
}

//ajax function to log user into calendar website
function loginAjax(event) {
    event.preventDefault();
    const username = document.getElementById("usernameL").value; // Get the username from the form
    const password = document.getElementById("passwordL").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = {
        'username': username,
        'password': password
    };

    //call server script to log user in
    fetch("loginUser.php", {
            method: 'POST',
            //mode: 'same-origin',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function (response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(data => processLogin(data))
        .catch(error => console.error('Error:', error));
}

//add event listener for login form
document.getElementById("login_btn").addEventListener("click", loginAjax, false);

//alert user to successful registration
function processRegister(data) {
    console.log("fetch returned data");
    if (data.error == "true") {
        console.log(data.eMessage);
        //changeToLoggedInUI();
    } else {
        console.log("registration successful");
        alert("Now login using the login form");
    }
}

//ajax function to add new user to the calendar website
function newUserAjax(event) {
    event.preventDefault();
    console.log("starting register");
    const username = document.getElementById("usernameR").value; // Get the username from the form
    const password = document.getElementById("passwordR").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = {
        'username': username,
        'password': password
    };
    console.log(JSON.stringify(data));
    //call server script to register user and add them to database
    fetch("registerUser.php", {
            method: 'POST',
            //mode: 'same-origin',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(function (response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(processRegister(data))
        .catch(error => console.error('Error:', error));
}

//add event listener for register form
document.getElementById("register_btn").addEventListener("click", newUserAjax, false);
//document.getElementById("register_btn").addEventListener("click", () => console.log("event listener triggered"), false);