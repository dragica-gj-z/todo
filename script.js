const toDoItems = document.getElementsByClassName("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");
input.addEventListener("keydown", function(event) {
    if(event.key === "Enter")
    addItem();
})

function addItem(){
    var divParent = document.createElement("div"); 
    var divChild = document.createElement("div"); 
    var checkIcon = document.createElement("i");
    var trashIcon = document.createElement("i");

    divParent.className = "item"; 
    divParent.innerHTML = "<div>"+input.value+"</div>"; 

    checkIcon.className = "fa-solid fa-check"; 
    checkIcon.style.color = "lihgtgray"; 
    checkIcon.addEventListener("click", function(){
        checkIcon.style.color = "limegreen";
    })
    divChild.appendChild(checkIcon); 

    trashIcon.className = "fa-sharp fa-solid fa-trash"; 
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", function(){
        divParent.remove(); 
    })
    divChild.appendChild(trashIcon); 
    divParent.appendChild(divChild);  
    toDoItems.appendChild(divParent); 
    input.value= " "; 
}

//Date and Time

const date = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
var m = months[date.getMonth()];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"];
var d = days[date.getDay()-1];
document.getElementById("date").innerHTML = d + " " + m + " " + date.getDate();
document.getElementById("time").innerHTML =date.getHours() + ":" + date.getMinutes();

//Weather App


var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')


apikey = "da574173564fd2a6161012eb71670d8d"

//convert Kelvin to Celsius
function convertion(val){
return (val - 273).toFixed(0)
}

btn.addEventListener('click', function(){

fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apikey)
.then(res => res.json())

.then(data => {

    var nameval = data['name']
    var descrip = data['weather']['0']['description']
    var tempature = data['main']['temp']
    var wndspd = data['wind']['speed']

    city.innerHTML=`<span>${nameval}<span>`
    temp.innerHTML = `Temperature: <span>${ convertion(tempature)} °C</span>`
    description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
    wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`

})

.catch(err => alert('You entered Wrong city name'))
})

//Calendar

function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";
   
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        var row = document.createElement("tr");

        
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


