var birthday = new Date("2027-09-19");

Dayhours = Number(localStorage.getItem('Dayhours')) || 0;
Daymins = Number(localStorage.getItem('Daymins')) || 0;
nighthours = Number(localStorage.getItem('nighthours')) || 0;
nightmins = Number(localStorage.getItem('nightminutes')) || 0;
km = Number(localStorage.getItem('km')) || 0;
tripstoschool = Number(localStorage.getItem('tripstoschool')) || 0;
tripstoepping = Number(localStorage.getItem('tripstoepping')) || 0;

rand = Math.random();

function updatedate() {
    var today = new Date();
    var seconds_remaining = 60-today.getSeconds();
    var miliseconds_remaining = 1000-today.getMilliseconds();
    var minutes_remaining = 60-today.getMinutes();
    var hours_remaining = 24-today.getHours();
    var difference = birthday.getTime() - today.getTime();
    var days_remaining = Math.ceil(difference / (1000 * 3600 * 24));
    var weeks_remaining = round((days_remaining / 7), 1);

    document.getElementById("weeksleft").innerHTML = "weeks: " + weeks_remaining;
    document.getElementById("daysleft").innerHTML = "days: " + days_remaining;
    document.getElementById("hoursleft").innerHTML = "hours: " + hours_remaining;
    document.getElementById("minutesleft").innerHTML = "minutes: " + minutes_remaining;
    document.getElementById("secondsleft").innerHTML = "seconds: " + seconds_remaining;
    document.getElementById("milisecondsleft").innerHTML = "milliseconds: " + miliseconds_remaining;

    if (Dayhours < 0) {
        Dayhours = 0;
        saveToLocalStorage();
    }
    if (Daymins > 60 || Daymins < 0) {
        Daymins = 0;
        saveToLocalStorage();
    }
    if (nighthours < 0) {
        nighthours = 0;
        saveToLocalStorage();
    }
    if (nightmins > 60 || nightmins < 0) {
        nightmins = 0;
        saveToLocalStorage();
    }
    totalhours = Dayhours + nighthours;
    totalmins = Daymins + nightmins;
    if(totalmins>60){
        totalhours++;
        totalmins = totalmins-60;
    }
    
    document.getElementById("dayhours").innerHTML = "day hour: " + Dayhours;
    document.getElementById("dayminutes").innerHTML = "day minutes: " + Daymins;
    document.getElementById("nighthours").innerHTML = "night hour: " + nighthours;
    document.getElementById("nightminutes").innerHTML = "night minutes: " + nightmins;
    document.getElementById("totalhours").innerHTML = "total hours: " + totalhours;
    document.getElementById("totalmins").innerHTML = "total minutes: " + totalmins;

    meters = km * 1000;
    speed = round(km / totalhours,2);
    distiancetoepping = round(km/24.8, 2);
    distiancetoschool = round(km/5.3, 2);
    document.getElementById("km").innerHTML = "Total km: " + km;
    document.getElementById("meters").innerHTML = "Total meters: " + meters;
    document.getElementById("speed").innerHTML = "Average Speed: " + speed;
    document.getElementById("distiancetoepping").innerHTML = "trips to epping: " + distiancetoepping + "/" + tripstoepping;
    document.getElementById("distiancetoschool").innerHTML = "trips to school: " + distiancetoschool + "/" + tripstoschool;
    

    remaininghours = round((119-Dayhours)+(1-(Daymins/60)), 2);
    remainingnighthours = round((19-nighthours)+(1-(nightmins/60)), 2);
    hoursperweek = round((remaininghours / weeks_remaining), 2);
    

    document.getElementById("hoursperweek").innerHTML = "hour/week: " + hoursperweek;
    document.getElementById("remaininghours").innerHTML = "remaining hours: " + remaininghours;
    document.getElementById("remainingnighthours").innerHTML = "remaining night hours: " + remainingnighthours;
    document.getElementById("loadingbar").style.width = ((365 - days_remaining) / 365) * 100 + "%";
    let daysPassed = 365 - days_remaining;

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        if (index < daysPassed) {
            dot.style.background = "rgba(0, 30, 0)";
        } else {
            dot.style.background = "rgba(30, 30, 30)";
        }
    });
}

function round(x,y){
    return (Math.round(x*10**y)/10**y);
}

const addhour = () => {
    Dayhours++;
    saveToLocalStorage();
}
const subhour = () => {
    Dayhours--;
    saveToLocalStorage();
}
const subminute = () => {
    Daymins--;
    saveToLocalStorage();
}
const addminute = () => {
    Daymins+=2;
    saveToLocalStorage();
}

const naddhour = () => {
    nighthours++;
    saveToLocalStorage();
}
const nsubhour = () => {
    nighthours--;
    saveToLocalStorage();
}
const nsubminute = () => {
    nightmins--;
    saveToLocalStorage();
}
const naddminute = () => {
    nightmins+=2;
    saveToLocalStorage();
}

const addkm = () => {
    km++;
    saveToLocalStorage();
}
const subkm = () => {
    km--;
    saveToLocalStorage();
}

const addsc = () => {
    tripstoschool++;
    saveToLocalStorage();
}
const subsc = () => {
    tripstoschool--;
    saveToLocalStorage();
}


const addep = () => {
    tripstoepping++;
    saveToLocalStorage();
}
const subep = () => {
    tripstoepping--;
    saveToLocalStorage();
}


updatedate();
setInterval(updatedate, 1);
        
const saveToLocalStorage = () => {
    localStorage.setItem('Dayhours', Dayhours);
    localStorage.setItem('Daymins', Daymins);
    localStorage.setItem('nighthours', nighthours);
    localStorage.setItem('nightminutes', nightmins);
    localStorage.setItem('km', km);
    localStorage.setItem('tripstoepping', tripstoepping);
    localStorage.setItem('tripstoschool', tripstoschool);
}
const dotgrid = document.getElementById("dotgrid");

for (let i = 0; i < 361; i++) {
    const dot = document.createElement("div");

    dot.className = "dot";

    dotgrid.appendChild(dot);
}
