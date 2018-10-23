//process http response
//used as callback for fetch request
function processAddEvent(data) {
    if (data.error) {
        console.log(data.eMessage);
    } else {
        console.log("succesfully added");
        //clear form
        $(".clear").val("");
        fetchData();

    }
}
//function to call server script to add event to db
function addEvent() {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start").value;
    const token = document.getElementsByClassName("token")[0].value;
    let tags = document.getElementById("tags").value;
    tags = tags.replace(/\s+/g, '');
    let tags_arr = tags.split(",");
    if (tags_arr.length == 1 || tags_arr.length == 0) {
        tags_arr.push("default");
    }
    for (let i = 0; i < tags_arr.length; i++) {
        if ((tags_arr[i] == "")) {
            tags_arr.splice(i, 1);
        }
    }
    console.log(tags_arr);

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
        'token': token,
        'tags': tags_arr
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