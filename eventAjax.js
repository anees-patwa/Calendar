//process http response
//used as callback for fetch request
function processAddEvent(data) {
    if (data.error) {
        console.log(data.eMessage);
    } else {
        console.log("succesfully added");
    }
}
//function to call server script to add event to db
function addEvent() {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start").value;
    const token = document.getElementById("token").value;
    console.log(title);
    console.log(date);
    console.log(startTime);
    //filter title
    titleRegEx = RegExp('(\w*\ *)+');
    if (!titleRegEx.test(title)) {
        alert("Invalid title");
        return;
    }

    //filter date
    /*dateRegEx = RegExp('\d{4}-\d{2}-\d{2}');
    console.log(dateRegEx);
    console.log(dateRegEx.test(date));
    if (!dateRegEx.test(date)) {
        alert("Invalid date");
        return;
    }*/

    //filter startTime
    /*startTimeRegEx = RegExp('\d{2}:\d{2}');
    if (!startTimeRegEx.test(startTime)) {
        alert("Invalid time");
        return;
    }*/

    const data = {
        'start': startTime,
        'date': date,
        'title': title,
        'token': token
    }

    //make http request
    fetch("addEvent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => processAddEvent(data))
        .catch(error => console.error("Error: " + error))
}

//add event listener to form button
document.getElementById("newEvent_btn").addEventListener("click", addEvent, false);