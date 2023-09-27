const apiKey = '9ff2dd03aa5ea0140a3b500ecf444723';

// Function to fetch weather data
function fetchWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; // Units set to imperial for Fahrenheit
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`; // Units set to imperial for Fahrenheit

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
        })
        .catch((error) => console.error('Error fetching current weather data:', error));

    // Fetch 5-day forecast data
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            displayForecast(data);
        })
        .catch((error) => console.error('Error fetching forecast data:', error));

    // Add the city to the search history
    addToSearchHistory(city);
}

// Function to display current weather data
function displayCurrentWeather(data) {
    // Update the HTML to display current weather data
    const cityName = data.name;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const weatherIcon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Update the HTML elements with the data
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('current-date').textContent = date;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    document.getElementById('temperature').textContent = `${temperature}°F`; // Temperature in Fahrenheit
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
}

// Function to display 5-day forecast data
function displayForecast(data) {
    // Extract and display the 5-day forecast data
    const forecastList = data.list;
    const forecastContainer = document.getElementById('forecast');

    // Clear any existing forecast data
    forecastContainer.innerHTML = '';

    // Loop through the forecast data and create cards for each day
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecastData = forecastList[i];
        const date = new Date(forecastData.dt * 1000).toLocaleDateString();
        const weatherIcon = forecastData.weather[0].icon;
        const temperature = forecastData.main.temp;
        const humidity = forecastData.main.humidity;
        const windSpeed = forecastData.wind.speed;

        // Create a card for each day's forecast
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <h3>${date}</h3>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            <p>${temperature}°F</p> <!-- Temperature in Fahrenheit -->
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        // Append the card to the forecast container
        forecastContainer.appendChild(card);
    }
}

// Function to add a city to the search history
function addToSearchHistory(city) {
    const searchHistoryList = document.getElementById('search-history');
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.classList.add('searched-city');
    searchHistoryList.appendChild(listItem);

    // Add a click event listener to the new list item
    listItem.addEventListener('click', function () {
        fetchWeatherData(city);
    });
}

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeatherData(city);
        cityInput.value = '';
    }
});

// Initial code to load some default data
fetchWeatherData('New York');
