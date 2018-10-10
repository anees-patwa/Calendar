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
<script src="unregisteredAjax.js"></script>