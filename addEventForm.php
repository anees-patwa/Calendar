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
            <input type="text" id="date" class="form-control">
        </div>
        <div class="form-group">
            <label for="start">Start Time: </label>
            <input type="text" id="start" class="form-control">
        </div>
        <input type="hidden" value="<?php session_start(); echo $_SESSION['token'];?>" id="token">
        <button type="submit" id="newEvent_btn" class="btn btn-primary">Submit</button>
    </form>
</div>

<script src="eventAjax.js"></script>