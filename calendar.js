let months = [null, 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dates = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

//current date
let today = new Date();
let month = today.getMonth() + 1;
let setMonth = today.getMonth() + 1;
let year = today.getFullYear();


let firstDay = new Date(year, month - 1, 1);




let monthHolder = today.getMonth() + 1;
let yearHolder = today.getFullYear();


// document.getElementById("month").innerHTML = months[month]; //sets current month
// document.getElementById("year").innerHTML = year;

function nextMonth() {
    month += 1;

    if (month > 12) {
        month = 1;
        year = year + 1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month];
    $hiddenMonth = document.createElement("p");
    $hiddenMonth.setAttribute("id", month + "month");
    $hiddenMonth.style.display = "none";
    document.getElementById("month").appendChild($hiddenMonth);

    $hiddenYear = document.createElement("p");
    $hiddenYear.setAttribute("id", year + "year");
    $hiddenYear.style.display = "none";
    document.getElementById("year").appendChild($hiddenYear);

    firstDay = new Date(year, month - 1, 1);

    for (i = 0; i <= 6; ++i) {
        $(".weekdays").empty();
    }
    //let d = 0;
    let day1 = firstDay.getDay();
    let sum = day1;
    for (i = 0; i <= 6; ++i) {
        let actualDate = dates[sum];
        $(".weekdays").append("<li id=" + '' + 'slot' + i + ">" + actualDate + "</li>");
        // document.getElementById('slot' + i).innerHTML = actualDate;


        //d += 1;
        sum += 1;


        if (sum > 6) {
            sum = 0;
            //day1 = 0;
            //d = 0;
        }
    }

    //removeDays();
    fetchData();



}

function prevMonth() {
    month -= 1;
    if (month <= 0) {
        month = 12;
        year = year - 1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month];
    $hiddenMonth = document.createElement("p");
    $hiddenMonth.setAttribute("id", month + "month");
    $hiddenMonth.style.display = "none";
    document.getElementById("month").appendChild($hiddenMonth);

    $hiddenYear = document.createElement("p");
    $hiddenYear.setAttribute("id", year + "year");
    $hiddenYear.style.display = "none";
    document.getElementById("year").appendChild($hiddenYear);
    firstDay = new Date(year, month - 1, 1);


    for (i = 0; i <= 6; ++i) {
        $(".weekdays").empty();
    }

    day1 = firstDay.getDay();
    sum = day1;
    for (i = 0; i <= 6; ++i) {
        actualDate = dates[sum];

        $(".weekdays").append("<li id=" + '' + 'slot' + i + ">" + actualDate + "</li>");
        // document.getElementById('slot' + i).innerHTML = actualDate;

        sum += 1;

        if (sum > 6) {
            sum = 0;
        }



    }

    //removeDays();
    fetchData();

}

function currentDate() { //resets date   
    year = today.getFullYear();
    month = today.getMonth() + 1;

    firstDay = new Date(year, month - 1, 1);

    for (i = 1; i <= 6; ++i) {
        $(".weekdays").empty();
    }
    //let d = 0;
    day1 = firstDay.getDay();
    sum = day1;

    for (i = 0; i <= 6; ++i) {
        let actualDate = dates[sum];
        $(".weekdays").append("<li id=" + '' + 'slot' + i + ">" + actualDate + "</li>");
        // document.getElementById('slot' + i).innerHTML = actualDate;


        //d += 1;
        sum += 1;


        if (sum > 6) {
            sum = 0;
            //day1 = 0;
            //d = 0;
        }
    }



    yearHolder = today.getFullYear();
    monthHolder = today.getMonth() + 1;

    document.getElementById('year').innerHTML = yearHolder;
    document.getElementById("month").innerHTML = months[monthHolder];
    $hiddenMonth = document.createElement("p");
    $hiddenMonth.setAttribute("id", month + "month");
    $hiddenMonth.style.display = "none";
    document.getElementById("month").appendChild($hiddenMonth);

    $hiddenYear = document.createElement("p");
    $hiddenYear.setAttribute("id", year + "year");
    $hiddenYear.style.display = "none";
    document.getElementById("year").appendChild($hiddenYear);
    //removeDays();
    fetchData();

}


//let day = 1;

function removeDays() {
    let day = 1;
    let amountOfDays = 31;

    //for (i = 1; i <= amountOfDays; ++i) {
    $(".days").empty();
    //}

    if (month == 2) {
        amountOfDays = 28;
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        amountOfDays = 30;
    }



    for (i = 1; i <= amountOfDays; ++i) {
        if (day > 0 && day < 10) {
            $(".days").append("<li id=" + '' + 'day' + 0 + day + " " + "class=" + 'dayContainer' + ">" + (day) + "</li>");
            day += 1;
        } else {
            // $(".days").append("<li id=" + '' + 'day' + day + "class = dayContainer>" + (day) + "</li>");
            $(".days").append("<li id=" + '' + 'day' + day + " " + "class=" + 'dayContainer' + ">" + (day) + "</li>");
            day += 1;
        }
    }

    //fetchData();

}

function deleteEvent(event) {
    //fetch to delete.php
    event.preventDefault();
    console.log("delete");
    id = event.target.id;
    console.log(event.target.id);
    id = id.substring(6, 8);
    console.log(id);
    id = parseInt(id);
    const token = document.getElementById('token').value;
    const deleteData = {
        "id": id,
        'token': token
    }

    fetch("deleteEvent.php", {
            method: "POST",
            body: JSON.stringify(deleteData),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(fetchData)
        .catch(error => console.log("Error: " + error));

    //delete event div from screen
}

function makeEvents(data) {
    console.log(data);
    //$(".dayContainer").empty();
    removeDays();
    // let first = data.firstDay;
    // removeDays();
    let downloadButton = document.getElementById("download");
    let csvString = "date,title,time\n";

    for (let i = 0; i < data.length; i++) {
        if (data[i].id == null) {
            //console.log("null event");
            continue;
        }
        const day = data[i].date.substring(8, 10); //Finds the specific day of the event
        const title = data[i].title;
        const time = data[i].time;
        const id = data[i].id.toString();
        csvString += data[i].date.toString() + "," + data[i].title + "," + data[i].time + "\n";
        //console.log(title + " " + day);
        $('#day' + day).append("<br>");
        //let container = document.createElement("div");
        //container.setAttribute("id", "event" + id);
        $('#day' + day).append("<span>" + title + "</span>");
        $('#day' + day).append("<br>");
        $('#day' + day).append("<span>" + time + "</span>");
        //container.append(document.createElement("p").append(document.createTextNode(title)));
        //container.append(document.createElement("p").append(document.createTextNode(time)));
        $('#day' + day).append("<br>");
        // $('#day'+ string).append("<span id=" +'event' + string +">"+ first +"</span>");
        $('#day' + day).append("<button id=" + 'edit' + id + ">" + 'edit' + "</button>");
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete" + id);
        deleteButton.append(document.createTextNode("delete"));
        deleteButton.addEventListener("click", deleteEvent, false);
        //container.append(deleteButton);

        //container.append("<button id=" + 'delete' + id + ">" + 'delete' + "</button>");
        $('#day' + day).append(deleteButton);
        //console.log("another event loaded")
        //document.getElementById("delete" + id).addEventListener('click', deleteEvent(id), false);
    }
    // data[i].time;

    //assign to download button
    let a = document.getElementById('download');
    a.download = "calendar.csv";
    a.href = 'data:text/csv;charset=utf-8,' + escape(csvString);


    //$(".days").append("<span id=" +'event' + ">"+ (data.firstDay) +"</span>");
    //make edit button for each event with id=edit#
    //make delete button with id = delete#
    //will also include event ID 
    // console.log(data);
}

function fetchData() {

    //event.preventDefault();
    //const today = new Date();
    let yearToSend = new Date().getFullYear();
    if (document.getElementById("year").childNodes[1]) {
        yearToSend = document.getElementById("year").childNodes[1].id.substring(0, 4);
        console.log("changed " + yearToSend);
    }
    let monthToSend = new Date().getMonth();
    if (document.getElementById("month").childNodes[1]) {
        monthToSend = document.getElementById("month").childNodes[1].id.substring(0, 2);
        console.log("changed " + yearToSend);
    }
    monthToSend = parseInt(monthToSend);
    //monthToSend += 1;
    if (monthToSend < 10) {
        monthToSend = "0" + monthToSend.toString();
    }
    const firstDay = yearToSend.toString() + "-" + monthToSend.toString() + "-" + "01";
    const lastDay = yearToSend.toString() + "-" + monthToSend.toString() + "-" + "31";
    //const last = document.getElementById("day31").textContent; 
    console.log("first " + firstDay);
    console.log("last " + lastDay);
    let tags = document.getElementsByTagName("input");
    //console.log(tags);
    tags_arr = new Array();
    // console.log(tags);
    // console.log(tags.length);
    // console.log(tags[0].getAttribute("value"));
    //console.log(tags[0].value);

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].type == "checkbox") {
            if (tags[i].checked) {
                tags_arr.push(tags[i].name);
            }
        }
    }

    //console.log(tags_arr);

    if (tags_arr.length == 0) {
        tags_arr.push("default");
    }

    const token = document.getElementById('token').value;

    //console.log(tags_arr);
    console.log(token);
    const data = {
        'firstDay': firstDay,
        'lastDay': lastDay,
        'tags': tags_arr,
        'token': token
    };


    fetch("getEvents.php", {
            method: 'POST',
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
        .then(data => makeEvents(data))
        .catch(error => console.error('Error:', error));

}


document.getElementById('next').addEventListener('click', nextMonth, false);
document.getElementById('prev').addEventListener('click', prevMonth, false);
document.getElementById('today').addEventListener('click', currentDate, false);
document.addEventListener("DOMContentLoaded", currentDate, false);
//document.addEventListener("DOMContentLoaded", removeDays, false);
//document.addEventListener("DOMContentLoaded", fetchData, false);