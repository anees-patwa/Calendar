//function to call server script to add event to db
function addEvent() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start").value;

    //filter title
    titleRegEx = RegExp('(\w*\ *)+');
    if (!titleRegEx.test(title)) {
        alert("Invalid title");
        return;
    }

    //filter date
    dateRegEx = RegExp('');
    //filter startTime
}