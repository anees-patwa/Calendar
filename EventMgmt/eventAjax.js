function processAddEvent(data) {
    if (data.error) {
        console.log(data.eMessage);
    } else {
        console.log("succesfully added");
    }
}
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
    dateRegEx = RegExp('\d{4}-\d{2}-\d{2}');
    if (!dateRegEx.test(date)) {
        alert("Invalid date");
        return;
    }

    //filter startTime
    startTimeRegEx = RegExp('\d{2}:\d{2}');
    if (!startTimeRegEx.test(startTime)) {
        alert("Invalid time");
        return;
    }

    const data = {
        'start': startTime,
        'date': date,
        'title': title,
    }

    fetch("addEvent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => processAddEvent(data))
        .catch(error => console.log("Error: " + error))
}

//add event listener to form button
document.getElementById("newEvent_btn").addEventListener("click", addEvent, false);