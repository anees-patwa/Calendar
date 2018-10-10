<!--Forms Applicable for registered users-->

<!--Login Form-->
<div class="container" id="loginForm">
    <h1>Login</h1>
    <form>
        <div class="form-group">
            <label for="username">Username: </label>
            <input type="text" id="username" placeholder="User Name" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" id="password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
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
            <input type="text" id="date" class="form-control">
        </div>
        <div class="form-group">
            <label for="start">Start Time: </label>
            <input type="text" id="start" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<script type="text/javascript" src="loginAjax.js"></script>