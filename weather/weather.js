const weatherCodeMap = {
    0: ["Clear Sky", "./svgs/sun.svg"],
    1: ["Mainly Clear", "./svgs/sun.svg"],
    2: ["Partly Cloudy", "./svgs/cloudy.svg"],
    3: ["Overcast", "./svgs/cloudy.svg"],
    45: ["Fog", "./svgs/fog.svg"],
    48: ["Depositing Rime Fog", "./svgs/fog.svg"],
    51: ["Light Drizzle", "./svgs/rain.svg"],
    53: ["Moderate Drizzle", "./svgs/rain.svg"],
    55: ["Dense Drizzle", "./svgs/rain.svg"],
    56: ["Light Freezing Drizzle", "./svgs/rain.svg"],
    57: ["Dense Freezing Drizzle", "./svgs/rain.svg"],
    61: ["Slight Rain", "./svgs/rain.svg"],
    63: ["Moderate Rain", "./svgs/rain.svg"],
    65: ["Heavy Rain", "./svgs/rain.svg"],
    66: ["Light Freezing Rain", "./svgs/rain.svg"],
    67: ["Dense Freezing Rain", "./svgs/rain.svg"],
    71: ["Light Snow", "./svgs/snow.svg"],
    73: ["Moderate Snow", "./svgs/snow.svg"],
    75: ["Heavy Snow", "./svgs/snow.svg"],
    77: ["Snow Grains", "./svgs/snow.svg"],
    80: ["Slight Rain Showers", "./svgs/rain.svg"],
    81: ["Moderate Rain Showers", "./svgs/rain.svg"],
    82: ["Violent Rain Showers", "./svgs/rain.svg"],
    85: ["Slight Snow Showers", "./svgs/snow.svg"],
    86: ["Heavy Snow Showers", "./svgs/snow.svg"],
    95: ["Thunderstorm", "./svgs/thunderstorm.svg"],
    96: ["Thunderstorm With Slight Hail", "./svgs/thunderstorm.svg"],
    99: ["Thunderstorm With Heavy Hail", "./svgs/thunderstorm.svg"]
};

async function getWeatherInfo() {
    var city = document.getElementById("search").value
    
    var request = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    var response = await fetch(request)
    var data = await response.json(); // get the lat and long and name from api

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude

    console.log(data)

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=sunrise,sunset&timezone=auto&forecast_days=2`;
    var weatherRequest = await fetch(weatherUrl)
    var weatherData = await weatherRequest.json()

    var times = weatherData.hourly.time;
    var temps = weatherData.hourly.temperature_2m;
    var weatherCodes = weatherData.hourly.weathercode;

    // nicely formatted 3 hour intervals
    var intervals = getTimeInterval(times, temps, weatherCodes)


    // sunrise and sunset
    var sunriseTime = weatherData.daily.sunrise[0].split("T")[1]
    var sunsetTime = weatherData.daily.sunset[0].split("T")[1]
    
    displaySun(sunriseTime, sunsetTime)
    showResults()
    displayCurrentWeather(intervals)
    displayIntervals(intervals)
    console.log(intervals)
}


function getTimeInterval(times, temps, weatherCodes) {
    const d = new Date();
    const currentHour = d.getHours();
    console.log(currentHour)

    //  match this hour with response given 
    const startIndex = times.findIndex(t => {
        const hour = new Date(t).getHours()
        return hour === currentHour
    })

    var intervals = []
    // from start + 24 hours, in 3 hour intervals 
    for (var i = startIndex; i < startIndex + 24; i += 3) {
        intervals.push({
            time: times[i],
            temp: temps[i],
            weatherCode: Number(weatherCodes[i])
        })
    }
    return intervals
}


function showResults() {
    results = document.getElementById("weather-results")

    results.classList.add("visible")
}

function displayCurrentWeather(intervals) {
    var { time, temp, weatherCode } = intervals[0]

    var currentSvg = document.getElementById("weather-svg")
    currentSvg.src = weatherCodeMap[weatherCode][1]

    var currentWeather = document.getElementById("now-stats")
    currentWeather.textContent = `${weatherCodeMap[weatherCode][0]} & ${temp} °C`
}

function displayIntervals(intervals) {
    var container = document.getElementById("forecast-right")
    container.innerHTML = ""

    intervals.forEach((interval) =>{ // use lambda function that takes the argument of interval 
        var col = formatInterval(interval);
        container.appendChild(col)
    })
}

function formatInterval(interval) {
    var { time, temp, weatherCode } = interval

    var date = new Date(time);
    var hours = date.getHours();
    var label = "AM"
    var displayHour = hours % 12 || 12
    if (hours > 12) {
        label = "PM"
    }

    // svg
    var svgSrc = weatherCodeMap[weatherCode][1]

    // column
    var col = document.createElement("div")
    col.className = "column-info"
    col.innerHTML =
        `       <div id="info-time">${displayHour} ${label}</div> 
                <img src="${svgSrc}" alt="" class="weather-svg">
                <div id="info-temp">${temp}°C</div>`
    return col
}

function displaySun(sunrise, sunset){
    var todayDate = new Date().toLocaleDateString()
    const  displayDate = document.getElementById("displayDate")
    displayDate.textContent = todayDate

    const displaySunrise = document.getElementById("sunriseText")
    displaySunrise.textContent = sunrise

    const displaySunset = document.getElementById("sunsetText")
    displaySunset.textContent = sunset

}
