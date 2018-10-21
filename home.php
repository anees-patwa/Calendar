<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous">
    <link rel="stylesheet" href="site.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
    <meta charset="utf-8">
    <title>Home</title>
</head>

<body>
    <div class="container" id="cal">
        <h1>Calendar</h1>
    </div>
    <!--Forms Applicable for unregistered users-->

    <!--Login Form-->
    <div class="container" id="loginForm">
        <h1>Login</h1>
        <form>
            <div class="form-group">
                <label for="usernameL">Username: </label>
                <input type="text" id="usernameL" placeholder="User Name" class="form-control">
            </div>
            <div class="form-group">
                <label for="passwordL">Password: </label>
                <input type="password" id="passwordL" class="form-control">
            </div>
            <button type="submit" id="login_btn" class="btn btn-primary">Submit</button>
        </form>
    </div>

    <!--New User Form-->
    <div class="container" id="newUserForm">
        <h1>Register</h1>
        <form>
            <div class="form-group">
                <label for="usernameR">Username: </label>
                <input type="text" id="usernameR" placeholder="User Name" class="form-control">
            </div>
            <div class="form-group">
                <label for="passwordR">Password: </label>
                <input type="password" id="passwordR" class="form-control">
            </div>
            <button type="submit" id="register_btn" class="btn btn-primary">Submit</button>
        </form>
    </div>

    <!--load js file-->
    <script src="loginRegisterAjax.js"></script>
    <!--Forms Applicable for registered users-->


    <!--Add Event Form-->
    <div class="container" id="addEvent">
        <h1>New Event</h1>
        <form>
            <div class="form-group">
                <label for="title">Title: </label>
                <input type="text" id="title" placeholder="Event Title" class="form-control">
            </div>
            <div class="form-group">
                <label for="date">Date: </label>
                <input type="date" id="date" class="form-control">
            </div>
            <div class="form-group">
                <label for="start">Start Time: </label>
                <input type="time" id="start" class="form-control">
            </div>
            <input type="hidden" value="null" id="token">
            <button type="submit" id="newEvent_btn" class="btn btn-primary">Submit</button>
        </form>
    </div>

    <script src="eventAjax.js"></script>
</body>



</html>