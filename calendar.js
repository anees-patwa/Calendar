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

    firstDay = new Date(year, month-1, 1);

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

    removeDays();


    
}

function prevMonth() {
    month -= 1;
    if (month <= 0) {
        month = 12;
        year = year - 1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month];

    firstDay = new Date(year, month-1, 1);


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

    removeDays();
    
}

function currentDate() { //resets date   
    year = today.getFullYear();
    month = today.getMonth()+1;
    
    firstDay = new Date(year, month-1, 1);

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
    document.getElementById("month").innerHTML = months[monthHolder]
    removeDays();

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
        $(".days").append("<li id=" + '' + 'day' + day + ">" + (day) + "</li>");
        day += 1;
    }

}

function deleteEvent(){
    //fetch to delete.php

    //delete event div from screen
}

function makeEvents(data){
        let first = data.firstDay;
        let string = first.substring(8,9); //Finds the specific day of the event 
        $('#day'+ string).append("<span id=" +'title' + string +">"+ 'Title' +"</span>");
        $('#day'+ string).append("<span id=" +'time' + string +">"+ 'Time' +"</span>");
        // $('#day'+ string).append("<span id=" +'event' + string +">"+ first +"</span>");
        $('#day'+ string).append("<button id=" +'edit' + string +">"+ 'edit' +"</button>");
        $('#day'+ string).append("<button id=" +'delete' + string +">"+ 'delete' +"</button>");
        document.getElementById("delete" + string).addEventListener('click', deleteEvent, false);
    
    // data[i].time;
    
    //$(".days").append("<span id=" +'event' + ">"+ (data.firstDay) +"</span>");
    //make edit button for each event with id=edit#
    //make delete button with id = delete#
    //will also include event ID 
    // console.log(data);
}

function fetchData(){

    //event.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if(month < 10){
        month = "0" + month.toString();
    }
    const firstDay = year.toString() + "-" + month + "-" + 1;
    const lastDay = year.toString() + "-" + month + "-" + 31;
    //const last = document.getElementById("day31").textContent; 

    let tags = document.getElementsByClassName("form-check-input");
    tags_arr = new Array();
    // console.log(tags);
    // console.log(tags.length);
    // console.log(tags[0].getAttribute("value"));
    //console.log(tags[0].value);

   for(let i = 0; i < tags.length; i++){
       if(tags[i].getAttribute("checked")){
        tags_arr.push(tags[i].getAttribute("value"));
       }
   }

    //console.log(tags_arr);

    const data = {
        'firstDay': firstDay,
        'lastDay': lastDay,
        'tags': tags_arr
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
.then(makeEvents(data))
.catch(error => console.error('Error:', error));

}


document.getElementById('next').addEventListener('click', nextMonth, false);
document.getElementById('prev').addEventListener('click', prevMonth, false);
document.getElementById('today').addEventListener('click', currentDate, false);
document.addEventListener("DOMContentLoaded", currentDate, false);
//document.addEventListener("DOMContentLoaded", removeDays, false);
//document.addEventListener("DOMContentLoaded", fetchData, false);