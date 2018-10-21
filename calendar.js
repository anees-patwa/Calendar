let months = [null, 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date();
let month = today.getMonth()+1;
let year = today.getFullYear();

let monthHolder = today.getMonth()+1;
let yearHolder = today.getFullYear();

document.getElementById('next').addEventListener('click', nextMonth);
// document.getElementById('next').addEventListener('click', removeDays);
// document.getElementById('prev').addEventListener('click', removeDays);
document.getElementById('prev').addEventListener('click', prevMonth);
document.getElementById('today').addEventListener('click', currentDate);
document.getElementById("month").innerHTML = months[month]; //sets current month
document.getElementById("year").innerHTML = year;


function nextMonth(){
    month += 1;
    if(month > 12){ 
        month = 1;
        year = year +1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month]; 
}
 
function prevMonth(){
    month -= 1;
    if(month < 1){ 
        month = 12;
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


function removeDays(){
   
    let day = 1;
    let amountOfDays = 31;

    for(i = 1; i <= amountOfDays; ++i){
        $(".days").empty();
     }

    if(month == 2){
        amountOfDays = 28;
    }
    if(month == 4 || month == 6 || month == 9 || month == 11 ){
        amountOfDays = 30;
    }


    for(i = 1; i <= amountOfDays; ++i){
        $(".days").append("<li id=" + '' + 'day' + day +  ">" + (day) + "</li>");
         day += 1;
    }
    console.log(amountOfDays +'days');
    console.log("month" + month);
}