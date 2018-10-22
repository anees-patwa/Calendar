let months = [null, 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dates = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
let today = new Date();
let month = today.getMonth()+1;
let setMonth = today.getMonth()+1;
let year = today.getFullYear();
let firstDay = new Date(year, month-1, 1);
let lastDay = new Date(year, month + 1, 0);




let monthHolder = today.getMonth()+1;
let yearHolder = today.getFullYear();

document.getElementById('next').addEventListener('click', nextMonth);
document.getElementById('next').addEventListener('click', removeDays);
document.getElementById('prev').addEventListener('click', removeDays);
document.getElementById('prev').addEventListener('click', prevMonth);
document.getElementById('today').addEventListener('click', currentDate);
document.getElementById("month").innerHTML = months[month]; //sets current month
document.getElementById("year").innerHTML = year;

removeDays();
currentDate();

function nextMonth(){
    firstDay = new Date(year, month, 1);
   

    for(i = 1; i <= 6; ++i){
        $(".weekdays").empty();
     }
        let d = 0;
        let day1 = firstDay.getDay();
        let sum = day1;
        for(i = 0; i <= 6 ; ++i){
            let actualDate = dates[sum];
            $(".weekdays").append("<li id=" + '' + 'slot' + i +  ">" + actualDate + "</li>");
            // document.getElementById('slot' + i).innerHTML = actualDate;
            
            
            d += 1;
            sum = day1+d;
            

            if(sum > 6){
                sum = 0;
                day1 = 0;
                d = 0;
        }
}


    month += 1;
    if(month > 12){ 
        month = 1;
        year = year +1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month]; 
}
 
function prevMonth(){

    firstDay = new Date(year, month, 1);
   

    for(i = 1; i <= 6; ++i){
        $(".weekdays").empty();
     }
        d = 0;
         day1 = firstDay.getDay();
         sum = day1;
        for(i = 0; i <= 6 ; ++i){
            
            if(sum+2 == 7){
                sum = -2;
            }
            if(sum+2 == 8){
                sum = -1;
            }

            if(sum > 6){
                sum = 0;
                day1 = 0;
                d = 0;
            }

             actualDate = dates[sum+2];

            console.log(sum+2);
            $(".weekdays").append("<li id=" + '' + 'slot' + i +  ">" + actualDate + "</li>");
            // document.getElementById('slot' + i).innerHTML = actualDate;
            
            
            d += 1;
            sum = day1+d;
            
           

}
    month -= 1;
    if(month <= 0){ 
        month = 12;
        year = year -1;
        document.getElementById('year').innerHTML = year;
    }
    document.getElementById("month").innerHTML = months[month]; 
}

function currentDate(){ //resets date   
    
    firstDay = new Date(year, month-1, 1);
   

    for(i = 1; i <= 6; ++i){
        $(".weekdays").empty();
     }
        let d = 0;
        let day1 = firstDay.getDay();
        let sum = day1;
        for(i = 0; i <= 6 ; ++i){
            let actualDate = dates[sum];
            $(".weekdays").append("<li id=" + '' + 'slot' + i +  ">" + actualDate + "</li>");
            // document.getElementById('slot' + i).innerHTML = actualDate;
            
            
            d += 1;
            sum = day1+d;
            

            if(sum > 6){
                sum = 0;
                day1 = 0;
                d = 0;
        }
}

    
    
    year = today.getFullYear();
    month = today.getMonth()+1;
    
    document.getElementById('year').innerHTML = yearHolder;
    document.getElementById("month").innerHTML = months[monthHolder]
     
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
   
}