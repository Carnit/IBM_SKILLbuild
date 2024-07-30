var apiKey = 'af5b3b4c8a68afef6100bbb71df8abe2';

async function getWeather(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log("Fetching weather data from URL:", url);

    var response = await fetch(url);
    if (!response.ok) { // Check for successful response (status code 200)
        var errorText = await response.text();
        throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText} - ${errorText}`);
    }
    var data = await response.json();
    return data;
}

async function onMapClick(e) {
    try {
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;
        console.log("Map clicked at latitude:", lat, "longitude:", lon);

        var weatherData = await getWeather(lat, lon);
        console.log("Weather data received:", weatherData);

        var weatherInfo = `
            <strong>Location:</strong> ${weatherData.name}<br>
            <strong>Temperature:</strong> ${weatherData.main.temp} °C<br>
            <strong>Weather:</strong> ${weatherData.weather[0].description}<br>
            <strong>Humidity:</strong> ${weatherData.main.humidity} %<br>
            <strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s
        `;

        L.popup()
            .setLatLng(e.latlng)
            .setContent(weatherInfo)
            .openOn(map);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

// Initialize the map (assuming you have an element with ID 'map' in your HTML)
var map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add click event listener to the map
map.on('click', onMapClick);
