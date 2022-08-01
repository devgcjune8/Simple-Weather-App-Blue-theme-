const api = {
    key: "543f19f94d3756cadd2f4dc3b7cc98ba",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);


function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value)
    } 
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.loc .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.loc .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;

    let weatherEl = document.querySelector(".current .weather");
    weatherEl.innerText = weather.weather[0].main;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerText = `${Math.round(weather.main.temp_max)}°C / ${Math.round(weather.main.temp_min)}°C`;

    function dateBuilder(d) {
        let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`;
    }
}