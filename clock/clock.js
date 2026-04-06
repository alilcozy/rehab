

var currentdate = new Date();

// date
var day = currentdate.getDate();
var month = (currentdate.getMonth() + 1); // returns 0-based number
var year = currentdate.getFullYear()

// time
var hours = currentdate.getHours()
var minutes = currentdate.getMinutes()
var seconds = currentdate.getSeconds()

const timeDisplay = document.getElementById("time")
timeDisplay.textContent = `${hours} ${minutes} ${seconds}`


console.log(`${date} ${time}`)

console.log(`${day} ${month} ${year}`)


function startTime() {
    const today = new Date();

    let date = today.toLocaleDateString()

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checkTime(h)
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').textContent = h + ":" + m + ":" + s;
    document.getElementById('date').textContent = `${date}`
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
