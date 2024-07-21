
// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c']
}).addTo(map);

// OpenWeatherMap API Key
var apiKey = 'af5b3b4c8a68afef6100bbb71df8abe2';
// Function to fetch weather data
async function getWeather(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/weather` +
        `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    var response = await fetch(url);
    var data = await response.json();
    return data;
}

// Function to handle map clicks
async function onMapClick(e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    try {
        var weatherData = await getWeather(lat, lon);

        var weatherInfo = `
            <strong>Location:</strong> ${weatherData.name}<br>
            <strong>Temperature:</strong> ${weatherData.main.temp} &deg;C<br>
            <strong>Weather:</strong> ${weatherData.weather[0].description}<br>
            <strong>Humidity:</strong> ${weatherData.main.humidity} %<br>
            <strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s`;

        L.popup()
            .setLatLng(e.latlng)
            .setContent(weatherInfo)
            .openOn(map);
    } catch (error) {
        console.log(error);
    }
}

// Add click event listener to the map
map.on('click', onMapClick);

