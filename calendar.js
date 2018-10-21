let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

let monthHolder = today.getMonth();
let yearHolder = today.getFullYear();

document.getElementById('next').addEventListener('click', nextMonth);
document.getElementById('next').addEventListener('click', makeCalendar);
document.getElementById('prev').addEventListener('click', prevMonth);
document.getElementById('today').addEventListener('click', currentDate);
document.getElementById("month").innerHTML = months[month]; //sets current month
document.getElementById("year").innerHTML = year;


function nextMonth(){
    month += 1;
    if(month > 11){ 
        month = 0;
        year = year +1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month]; 
}
 
function prevMonth(){
    month -= 1;
    if(month < 1){ 
        month = 11;
        year = year -1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month]; 
}

function currentDate(){ //resets date
    year = today.getFullYear();
    month = today.getMonth();
    document.getElementById('year').innerHTML = yearHolder;
    document.getElementById("month").innerHTML = months[monthHolder]; 
}


let day = 1;

// for(i = 1; i <= 31; ++i){
//     $(".days").append("<li id=" + '' + 'day' + day +  ">" + (day) + "</li>");
//     day += 1;
// }
function makeCalendar(){

    
     if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
        let amountOfDays = 31;

        for(i = 1; i <= amountOfDays; ++i){
            $(".days").append("<li id=" + '' + 'day' + day +  ">" + (day) + "</li>");
            day += 1;
        }
        
    }

    if(month == 1){
        amountOfDays = 28;
        for(i = 1; i <= amountOfDays; ++i){
            $(".days").append("<li id=" + '' + 'day' + day +  ">" + (day) + "</li>");
            day += 1;
        }
    }
}

